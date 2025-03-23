import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTableAndSeed1650000000000 implements MigrationInterface {
  name = 'CreateUsersTableAndSeed1650000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create table if it doesn't exist
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR NOT NULL UNIQUE,
        "password" VARCHAR NOT NULL,
        "role" VARCHAR NOT NULL
      )
    `);

    // Insert 1 admin and 4 regular users
    await queryRunner.query(`
      INSERT INTO "users" (email, password, role) VALUES
        ('admin@test.com', 'adminpassword', 'admin'),
        ('user1@test.com', 'password1', 'regular'),
        ('user2@test.com', 'password2', 'regular'),
        ('user3@test.com', 'password3', 'regular'),
        ('user4@test.com', 'password4', 'regular')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
