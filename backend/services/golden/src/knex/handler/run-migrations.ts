import { knex } from "knex";
import { ApiResponse, response } from "@shieldpay/http";
import { loggerLibrary } from "@shieldpay/logger";
import { fetchDbConfig } from "../config";

const HEADERS = {
  "Content-Type": "application/json",
};

export const handler = async (): Promise<ApiResponse> => {
  const logger = loggerLibrary.init();

  logger.info({ message: "Trigger handler to run migrations" });

  const dbConfig = await fetchDbConfig();
  const knexClient = knex(dbConfig);

  logger.info({
    message: `Run migrations against '${String(
      dbConfig.connection.database
    )}' db`,
  });

  try {
    const migrations: unknown = await knexClient.migrate.list();

    logger.info({ message: "Found migrations to run", details: migrations });

    const migrationResult: unknown = await knexClient.migrate.latest();

    const status: unknown = await knexClient.migrate.status();

    logger.info({
      message: "Migrations completed with status",
      details: status,
    });

    await knexClient.destroy();
    logger.info({
      message: "Migration result",
      details: migrationResult,
    });

    return response.success({ success: true, migrationResult }, HEADERS);
  } catch (error: unknown) {
    await knexClient.destroy();

    const errorAsJSON = JSON.stringify(
      error,
      Object.getOwnPropertyNames(error),
      2
    );

    logger.error({
      message: "An error occured during running migrations",
      details: errorAsJSON,
    });

    throw response.systemError({ error: errorAsJSON, status: "fail" }, HEADERS);
  }
};
