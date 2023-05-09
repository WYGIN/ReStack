import { serverAuth$ } from '@builder.io/qwik-auth';
import GitHub from '@auth/core/providers/github';
import type { Provider } from '@auth/core/providers';
import LinkedIn from "@auth/core/providers/linkedin";
import Google from "@auth/core/providers/google";
import Twitter from "@auth/core/providers/twitter";
import type { RequestEventBase } from "@builder.io/qwik-city";
import { type TokenSet } from "@auth/core/types";
import MyAdapter from "drizzle-pscale-adapter";
import db from '~/db';
import { and, eq } from 'drizzle-orm';
import { user as User, account as Account, session as Session, verificationToken as VToken } from '~/db/schema';
import type { AdapterAccount } from "@auth/core/adapters";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } = serverAuth$(
  (event: RequestEventBase) => ({
    secret: event.env.get('AUTH_SECRET'),
    trustHost: true,
    adapter: MyAdapter({ User, Account, Session, VToken, db(event: any) { return db(event) } }),
    providers: [
      GitHub({
        clientId: event.env.get('GITHUB_ID')!,
        clientSecret: event.env.get('GITHUB_SECRET')!,
      }),
      Google({
        clientId: event.env.get('GOOGLE_CLIENT_ID')!,
        clientSecret: event.env.get('GOOGLE_CLIENT_SECRET')!,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            include_granted_scopes: true,
          }
        }
      }),
      LinkedIn({
        clientId: event.env.get('LINKEDIN_CLIENT_ID')!,
        clientSecret: event.env.get('LINKEDIN_CLIENT_SECRET')!,
      }),
      Twitter({
        clientId: event.env.get('TWITTER_CLIENT_ID')!,
        clientSecret: event.env.get('TWITTER_CLIENT_SECRET')!,
      }),
    ] as Provider[],
    callbacks: {
      async session({ session, user, token }) {
        session.refresh_token = token?.refresh_token as string ?? ''
        session.provider = token?.provider as string ?? ''
        console.log("session callback token: ", token);
        try {
          const [auth] = await db(event).select().from(Account).where(and(eq(user.id as any, Account.userId), eq(session.provider as any, Account.provider))) as unknown as Array<AdapterAccount>
          if((auth.expires_at ?? 0) as number * 1000 < Date.now()) {
            try {
              if(auth.provider === 'github') {
                const response = await fetch("https://github.com/login/oauth/access_token", {
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: new URLSearchParams({
                    client_id: event.env.get('GITHUB_CLIENT_ID')!,
                    client_secret: event.env.get('GITHUB_CLIENT_SECRET')!,
                    grant_type: "refresh_token",
                    refresh_token: auth.refresh_token as any ?? token.refresh_token,
                  }) as any as string,
                  method: "POST",
                })
                
                const tokens: TokenSet = await response.json()
                if (!response.ok) throw tokens

                await db(event).update(Account).set({
                  access_token: tokens.access_token,
                  expires_at: Math.floor(tokens.expires_in as number + (Date.now() / 1000)),
                  refresh_token: tokens.refresh_token ?? auth.refresh_token,
                }).where(and(eq(Account.provider as any, session.provider), eq(auth.providerAccountId as any, Account.providerAccountId)))

              }
              if(auth.provider === 'google') {
                const response = await fetch("https://oauth2.googleapis.com/token", {
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: new URLSearchParams({
                    client_id: event.env.get('GOOGLE_CLIENT_ID')!,
                    client_secret: event.env.get('GOOGLE_CLIENT_SECRET')!,
                    grant_type: "refresh_token",
                    refresh_token: auth.refresh_token as any ?? token.refresh_token,
                  }) as any as string,
                  method: "POST",
                })

                const tokens: TokenSet = await response.json()
                if (!response.ok) throw tokens

                await db(event).update(Account).set({
                  access_token: tokens.access_token,
                  expires_at: Math.floor(tokens.expires_in as number + (Date.now() / 1000)),
                  refresh_token: tokens.refresh_token ?? auth.refresh_token,
                }).where(and(eq(Account.provider as any, session.provider), eq(auth.providerAccountId as any, Account.providerAccountId)))

              }
              if(auth.provider === 'linkedin') {
                const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: new URLSearchParams({
                    client_id: event.env.get('LINKEDIN_CLIENT_ID')!,
                    client_secret: event.env.get('LINKEDIN_CLIENT_SECRET')!,
                    grant_type: "refresh_token",
                    refresh_token: auth.refresh_token as any ?? token.refresh_token,
                  }) as any as string,
                  method: "POST",
                })

                const tokens: TokenSet = await response.json()
                if (!response.ok) throw tokens

                await db(event).update(Account).set({
                  access_token: tokens.access_token,
                  expires_at: Math.floor(tokens.expires_in as number + (Date.now() / 1000)),
                  refresh_token: tokens.refresh_token ?? auth.refresh_token,
                }).where(and(eq(Account.provider as any, session.provider), eq(auth.providerAccountId as any, Account.providerAccountId)))

              }
              if(auth.provider === 'twitter') {
                const response = await fetch("https://api.twitter.com/2/oauth2/token", {
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: new URLSearchParams({
                    client_id: event.env.get('TWITTER_CLIENT_ID')!,
                    grant_type: "refresh_token",
                    refresh_token: auth.refresh_token as any ?? token.refresh_token,
                  }) as any as string,
                  method: "POST",
                })

                const tokens: TokenSet = await response.json()
                if (!response.ok) throw tokens

                await db(event).update(Account).set({
                  access_token: tokens.access_token,
                  expires_at: Math.floor(tokens.expires_in as number + (Date.now() / 1000)),
                  refresh_token: tokens.refresh_token ?? auth.refresh_token,
                }).where(and(eq(Account.provider as any, session.provider), eq(auth.providerAccountId as any, Account.providerAccountId)))

              }
            } catch (error) {
              console.error("Error refreshing access token", error)
              session.error = "RefreshAccessTokenError"
            }
          }
        } catch(error) {
          console.log("query error", error);
        }
        return session;
      },
    }
  })
);

declare module "@auth/core/jwt" {
  export interface JWT {
    access_token: string
    expires_at: number
    refresh_token: string
    error?: "RefreshAccessTokenError"
  }
}

declare module "@auth/core/types" {
  export interface Session {
    error?: "RefreshAccessTokenError"
    refresh_token: string
    provider: string
  }
}
