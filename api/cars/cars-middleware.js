const db = require("./cars-model");
const vinValidator = require("vin-validator");

exports.checkCarId = (req, res, next) => {
  db.getById(req.params.id).then((car) => {
    if (!car)
      return next({
        status: 404,
        message: `car with id ${req.params.id} is not found`,
      });
    req.car = car;
    next();
  });
  // .catch(e=>next({ status:404}))
};

exports.checkCarPayload = (req, res, next) => {
  req.body.vin = req.body?.vin;
  req.body.make = req.body?.make?.trim();
  req.body.model = req.body?.model?.trim();
  req.body.mileage = req.body?.mileage;
  req.body.title = req.body?.title?.trim();
  req.body.transmission = req.body?.transmission?.trim();
  const { vin, make, model, mileage, title, transmission } = req.body;
  // if(!id) return next({ status: 400, message: `${id} is missing` })
  if (!vin) return next({ status: 400, message: `vin is missing` });
  if (!make) return next({ status: 400, message: `make is missing` });
  if (!model) return next({ status: 400, message: `model is missing` });
  if (!mileage) return next({ status: 400, message: `mileage is missing` });
  if (!title) return next({ status: 400, message: `title is missing` });
  if (!transmission)
    return next({ status: 400, message: `transmission is missing` });
  next();
};

exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  // req.body.vin = req.body
  const { vin } = req.body;
  if (!vinValidator.validate(vin))
    return next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  // req.car = car;
  next();
};

exports.checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  //filter by
  //do we get an empty array- if empty we know the vin is unique
  db.get({ vin: req.body.vin }).then((car) => {
    if (car.length > 0)
      return next({
        status: 400,
        message: `vin ${req.body.vin} already exists`,
      });
    next();
  });
};
