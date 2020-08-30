import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('spots_items', (table) => {
    table.increments('id').primary();
    table.integer('spot_id').notNullable().references('id').inTable('spots');
    table.string('item_id').notNullable().references('id').inTable('items');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('spots_item');
}
