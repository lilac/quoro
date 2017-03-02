import pg from 'pg';
import DatabaseService from './database-service';

const db = new DatabaseService((new pg.Client({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT, 10),
  host: process.env.HOST,
})));

export default db.connect().then(
  () => console.info('Database connected successfully.'),
  e => console.error(e.message)
).catch(e => console.error(e.message));
