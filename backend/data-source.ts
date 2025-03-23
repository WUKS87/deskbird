import { DataSource } from 'typeorm';
import { Users } from './src/users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'wolf',
  database: 'deskbird-db',
  entities: [Users],
  migrations: ['./src/migration/*.ts'],
  // Optional: synchronize: false,
});