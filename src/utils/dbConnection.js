// TODO: set up a database pool
// - install pg

import pg from "pg"

// Create a pool
export const db = new pg.Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL
})