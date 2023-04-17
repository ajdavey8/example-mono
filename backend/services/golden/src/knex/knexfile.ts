// This file is needed for running migrations/rollbacks via knex CLI;
// E.g. 'knex migrate:latest' or 'knex migrate:rollback';
// More info: https://knexjs.org/#knexfile, https://knexjs.org/#Migrations-CLI;

import { Knex } from "knex";

export enum Environment {
  TESTING = "testing",
}

const environmentsKnexConfigs: Record<Environment, Knex.Config> = {
  testing: {
    client: "postgres",
    connection: {
      host: String(process.env.DB_HOST || "localhost"),
      port: parseInt(process.env.DB_PORT || "5433"),
      // default value must be equal to the process.env.DB_NAME from .jest/env.js file
      database: String(process.env.DB_NAME || "golden_test"),
      user: String(process.env.DB_USERNAME || "postgres"),
      password: String(process.env.DB_PASSWORD || "postgres"),
    },
    migrations: {
      extension: "ts",
      directory: "./migration",
      tableName: "knex_migrations",
    },
  },
};

export default environmentsKnexConfigs;
