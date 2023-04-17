import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("partners", (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.raw("UUID()"));
    table.string("display_name", 45).notNullable();
    table.string("full_name", 45).notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists("partners");
};
