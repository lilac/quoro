import pg from 'pg';
import DatabaseService from './database-service';

require('dotenv').config();

const db = new DatabaseService((new pg.Client({
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT, 10),
  host: process.env.DATABASE_HOST,
})));

db.connect().then(
  () => console.info('Database connected successfully.'),
  e => console.error(e.message)
).catch(e => console.error(e.message));

export default db;
