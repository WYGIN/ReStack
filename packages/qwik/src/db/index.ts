import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import type { RequestEventBase } from "@builder.io/qwik-city";

const config = (event: RequestEventBase) => {
    return {
        host: event.env.get("DATABASE_HOST") || import.meta.env.VITE_DATABASE_HOST,
        username: event.env.get("DATABASE_USERNAME") || import.meta.env.VITE_DATABASE_USERNAME,
        password: event.env.get("DATABASE_PASSWORD") || import.meta.env.VITE_DATABASE_PASSWORD,
    }
}

export default function db(event: RequestEventBase) {
    const conn = connect(config(event))
    const DB = drizzle(conn);
    return DB;
}