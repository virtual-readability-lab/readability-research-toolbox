// https://node-postgres.com/features/pooling
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.PG_USER, 
    password: process.env.PG_PASS,
    connectionString: 'localhost:5432'
});

pool.on('connect', () => {
    console.log('database is connected');
});