import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'typeorm.db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  logging: true,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
