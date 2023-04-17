import { knex } from "knex";
import { ApiResponse, response } from "@shieldpay/http";
import { loggerLibrary } from "@shieldpay/logger";
import { fetchDbConfig } from "../config";

const HEADERS = {
  "Content-Type": "application/json",
};

export const handler = async (): Promise<ApiResponse> => {
  const logger = loggerLibrary.init();

  logger.info({ message: "Trigger handler to run rollbacks" });

  const dbConfig = await fetchDbConfig();
  const knexClient = knex(dbConfig);

  logger.info({
    message: `Run rollbacks against '${String(
      dbConfig.connection.database
    )}' db`,
  });

  try {
    const migrations: unknown = await knexClient.migrate.list();

    logger.info({
      message: "Found migrations to rollback",
      details: migrations,
    });

    const rollbackResult: unknown = await knexClient.migrate.rollback();

    const status: unknown = await knexClient.migrate.status();

    logger.info({
      message: "Migrations rollback completed with status",
      details: status,
    });

    await knexClient.destroy();

    logger.info({
      message: "Rollback result",
      details: rollbackResult,
    });

    return response.success({ success: true, rollbackResult }, HEADERS);
  } catch (error: unknown) {
    await knexClient.destroy();

    const errorAsJSON = JSON.stringify(
      error,
      Object.getOwnPropertyNames(error),
      2
    );

    logger.error({
      message: "An error occured during running rollbacks",
      details: errorAsJSON,
    });

    throw response.systemError({ error: errorAsJSON, status: "fail" }, HEADERS);
  }
};
