import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

config({ path: '.env' });

// Use the production URL or clean the main URL
const databaseUrl =
	process.env.DATABASE_URL_PROD || process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
