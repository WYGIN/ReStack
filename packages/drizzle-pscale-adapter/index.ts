import type { Adapter, AdapterAccount, AdapterUser, AdapterSession, VerificationToken } from "@auth/core/adapters";
import { InferModel } from 'drizzle-orm';
import { eq, and } from 'drizzle-orm';
import { sql } from "drizzle-orm"

import { nanoid } from 'nanoid/async';

type AdapterOptions = {
    User: any;
    Account: any;
    Session: any;
    VToken: any;
    db: any;
}

export default function MyAdapter({ User, Account, Session, VToken, db }: AdapterOptions): Adapter {
  // implement the adapter methods here
  return {
  createUser: async (data) => {
    console.log("createUser1: ", data);
    try {
      const id = await nanoid() as unknown as string;
      await db.insert(User).values({ ...data as any, id }) as unknown as AdapterUser
      const re = await db.select().from(User).where(eq(data.email as any, User.email)) as unknown as Array<AdapterUser>
      console.log("createUser: ", re[0])
      return re[0];
    } catch (error) {
      console.log("createUser error: ", error)
      const re = await db.select().from(User).where(eq(data.email as any, User.email)) as unknown as Array<AdapterUser>
      return re[0]
    }
  },
  getUser: async (id) => {
    console.log("getUser1: ", id)
    try {
      const re = await db.select().from(User).where(eq(id as any, User.id)) as unknown as Array<AdapterUser>
      console.log("getUser: ", re[0]);
      return re[0]
    } catch(error) {
      console.log("getUser error: ", error);
      return null;
    }
  },
  getUserByEmail: async (email) => {
    console.log("getUserByEmail1: ", email);
    try {
      const re = await db.select().from(User).where(eq(email as any, User.email)) as unknown as Array<AdapterUser>
      console.log("getUserByEmail: ", re[0]);
      if(!re[0]?.email) return null;
      return re[0];
    } catch(error) {
      console.log("getUserByEmail error: ", error);
      return null;
    }
  },
  getUserByAccount: async (data) => {
    console.log("getUserrByAccount1: ", data)
    try {
      const re = await db.select({id: User.id, name: User?.name, email: User?.email, emailVerified: User?.emailVerified, image: User?.image }).from(Account).where(and(eq(data.providerAccountId as any, Account.providerAccountId), eq(data.provider as any, Account.provider))).rightJoin(User, eq(Account.userId as any, User.id)) as unknown as Array<AdapterUser>
      console.log("getUserByAccount: ", re[0]);
      return re[0];
    } catch (error) {
      console.log("getUserByAccount error: ", error);
      return null;
    }
  },
  updateUser: async (data) => {
    console.log("updateUser1: ", data)
      await db.update(User).set(data as any).where(eq(data.id as any, User.id)) as any;
      const re = await db.select().from(User).where(eq(data.id as any, User.id)) as unknown as Array<AdapterUser>;
      console.log("updateUser: ", re[0]);
      return re[0];
  },
  deleteUser: async (userId) => {
    console.log("deleteUser1: ", userId)
    try {
      const re = await db.delete(User).where(eq(userId as any, User.id)) as any
      console.log("deleteUser: ", re);
      return null;
    } catch(error) {
      console.log("deleteUser error: ", error);
      return undefined;
    }
  },
  linkAccount: async (accountData: AdapterAccount) => {
    console.log("linkAccount1: ", accountData);
    try {
      if(!accountData.userId) throw new Error('linkAccount: userId is null or undefined')
      const data = await db.insert(Account).values({  provider: accountData.provider, providerAccountId: accountData.providerAccountId, type: accountData.type, userId: accountData.userId, access_token: accountData.access_token, id_token: accountData.id_token, scope: accountData.scope, expires_at: accountData?.expires_in, token_type: accountData.token_type, refresh_token: accountData?.refresh_token, session_state: accountData?.session_state as unknown as any }) as unknown as AdapterAccount
      console.log("linkAccount data1: ", data)
      const re = await db.select().from(Account).where(and(eq(accountData.provider as any, Account.provider), eq(accountData.providerAccountId as any, Account.providerAccountId))) as unknown as Array<AdapterAccount>
      console.log("linkAccount: ", re[0]);
      if(!re[0]?.providerAccountId || !re[0]?.provider) return null;
      return re[0];
    } catch (error) {
      console.log("linkAccount error: ", error);
      return undefined;
    }
  },
  unlinkAccount: async (providerAccountId) => {
    console.log("unlinkAccount1: ", providerAccountId)
    try {
      const data = db.select().from(Account).where(eq(providerAccountId as any, Account.providerAccountId)) as unknown as Array<AdapterAccount>
      const re = db.delete(Account).where(eq(providerAccountId as any, Account.providerAccountId)) as any
      console.log("unlinkAccount: ", re);
      if(!data[0]?.providerAccountId) return undefined;
      return data[0]
    } catch (error) {
      console.log("unlinkAccount error: ", error);
      return undefined;
    }
  },
  createSession: async ({ sessionToken, userId, expires }) => {
    console.log("createSession1: ", expires);
      await db.insert(Session).values({ sessionToken, userId, expires: new Date(expires) as any }) as any
      const re = await db.select().from(Session).where(eq(sessionToken as any, Session.sessionToken)) as unknown as Array<AdapterSession>
      return re[0];
  },
  getSessionAndUser: async (sessionToken) => {
    console.log("getSessionAndUser1: ", sessionToken)
    try {
      const SessionAndUser = await db.execute(sql`SELECT * FROM Session
        LEFT JOIN User ON User.id = Session.userId
        WHERE Session.sessionToken = ${sessionToken}
        UNION
        SELECT * FROM Session
        RIGHT JOIN User ON User.id = Session.userId
        WHERE Session.sessionToken = ${sessionToken}`) as unknown as any
      console.log("getSessionAndUser: ", SessionAndUser);
      const model = SessionAndUser.rows as unknown as Array<any>
      console.log("getSessionAndUser: ", model)
      if(!model[0]) return null
      const data = model[0];
      const user: AdapterUser = { id: data.id, name: data.name, email: data.email, emailVerified: data.emailVerified, image: data.image };
      const session: AdapterSession = { sessionToken: data.sessionToken, userId: data.userId, expires: new Date(data.expires) as any };
      console.log("getSessionAndUser User: ", user);
      console.log("getSessionAndUser session: ", session);
      return { user, session }
    } catch (error) {
      console.log("getSessionAndUser error: ", error);
      return null;
    }
  },
  updateSession: async (data) => {
    console.log("updateSession1: ", data)
    try {
      await db.update(Session).set(data as any).where(eq(Session.sessionToken as any, data.sessionToken)) as any
      const re = await db.select().from(Session).where(eq(Session.sessionToken as any, data.sessionToken)) as unknown as Array<AdapterSession>
      console.log("updateSession: ", re[0]);
      if(!re[0]?.sessionToken) return null;
      return re[0];
    } catch (error) {
      console.log("updateSession error: ", error);
      return undefined
    }
  },
  deleteSession: async (sessionToken) => {
    console.log("deleteSession1: ", sessionToken)
    try {
      const data = await db.select().from(Session).where(eq(sessionToken as any, Session.sessionToken)) as unknown as Array<AdapterSession>
      const re = await db.delete(Session).where(eq(sessionToken as any, Session.sessionToken)) as any
      console.log("deleteSession: ", re);
      if(!data[0]?.sessionToken) return null;
      return data[0]
    } catch (error) {
      console.log("deleteSession error: ", error);
      return undefined
    }
  },
  createVerificationToken: async (verificationTokenData) => {
    console.log("createVT1: ", verificationTokenData)
    try {
      await db.insert(VToken).values(verificationTokenData as any) as any
      const data = db.select().from(VToken).where(eq(verificationTokenData.token as any, VToken.token)) as unknown as Array<VerificationToken>
      console.log("createVerificationToken: ", data);
      if(!data[0]?.token) return null;
      return data[0]
    } catch (error) {
      console.log("createVerificationToken error: ", error);
      return undefined
    }
  },
  useVerificationToken: async (params) => {
    console.log("useVT1: ", params)
      try {
        await db.delete(VToken).where(eq(params.token as any, VToken.token)) as any
        const data = db.select().from(VToken).where(eq(params.token as any, VToken.token)) as unknown as Array<VerificationToken>
        console.log("useVerificationToken: ", data[0]);
        if(!data[0]?.token) return null;
        return data[0]
      } catch (error) {
        console.log("useVerificationToken error: ", error);
        return null
      }
    }
  }
}