import { Knex } from "knex";
import { fetchDBConfigurationBySecret } from "@shieldpay/db";

export interface KnexPostgresConfig extends Knex.Config {
  connection: Knex.PgConnectionConfig;
}

const migrationsConfig: Knex.MigratorConfig = {
  extension: "js",
  directory: "src/knex/migration",
  tableName: "knex_migrations",
};

export const fetchDbConfig = async (): Promise<KnexPostgresConfig> => {
  const connectionConfig = await fetchDBConfigurationBySecret(
    String(process.env.DATABASE_SECRET_ARN)
  );

  return {
    client: "postgres",
    connection: connectionConfig,
    migrations: migrationsConfig,
  };
};
