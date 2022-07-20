import { database } from './config.js';
import postgres from 'postgres';

const sql = postgres(`postgres://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`);

console.log(await sql`Select now()`);

export default sql;