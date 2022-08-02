const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("cars");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("cars").where("id", id).first();
};

const create = (car) => {
  // DO YOUR MAGIC
  return db("cars")
    .insert(car)
    .then((car) => getById(car[0]));
};

const get = (filter) => {
  return (
    db("cars")
      //check all columns by key, each key corresponds to a column in db
      .where(filter)
  );
};

module.exports = {
  getAll,
  getById,
  create,
  get,
};
