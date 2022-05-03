// https://node-postgres.com/features/pooling
import { Pool } from 'pg';

const pool = new Pool({
    database: process.env.PG_DB,
    user: process.env.PG_USER, 
    password: process.env.PG_PASS,
    host: 'localhost',
    port: parseInt(process.env.PG_PORT)
});

pool.on('connect', () => {
    console.log('### database is connected ###');
});

export { pool as db };