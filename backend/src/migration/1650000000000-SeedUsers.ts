import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateUsersTableAndSeed1650000000000 implements MigrationInterface {
  name = 'CreateUsersTableAndSeed1650000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR NOT NULL UNIQUE,
        "password" VARCHAR NOT NULL,
        "role" VARCHAR NOT NULL
      )
    `);

    const saltRounds = 10;
    
    const adminPassword = await bcrypt.hash('adminpass', saltRounds);
    const user1Password = await bcrypt.hash('pass1', saltRounds);
    const user2Password = await bcrypt.hash('pass2', saltRounds);
    const user3Password = await bcrypt.hash('pass3', saltRounds);
    const user4Password = await bcrypt.hash('pass4', saltRounds);

    await queryRunner.query(`
      INSERT INTO "users" (email, password, role) VALUES
        ('admin@test.com', '${adminPassword}', 'admin'),
        ('user1@test.com', '${user1Password}', 'user'),
        ('user2@test.com', '${user2Password}', 'user'),
        ('user3@test.com', '${user3Password}', 'user'),
        ('user4@test.com', '${user4Password}', 'user')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
