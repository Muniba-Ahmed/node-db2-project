// DO YOUR MAGIC
const router = require("express").Router();
const Car = require("./cars-model");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");
const dbConfig = require("../../data/db-config");

router.get("/", (req, res, next) => {
  Car.getAll()
    .then((allCars) => res.json(allCars))
    .catch((e) => next(e));
});

router.get("/:id", checkCarId, (req, res, next) => {
  const { id } = req.params;
  res.json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => {
    Car.create(req.body)
      .then((newCar) => res.status(201).json(newCar))
      .catch((e) => next(e));
  }
);

module.exports = router;
