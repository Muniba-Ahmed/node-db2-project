exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments();
    tbl.text("vin", 20).notNullable().unique();
    tbl.text("make", 20).notNullable();
    tbl.text("model", 20).notNullable();
    tbl.decimal("mileage").notNullable();
    tbl.text("title", 20).notNullable();
    tbl.text("transmission", 20).notNullable();
  });
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars");
};
