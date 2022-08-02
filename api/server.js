const express = require("express");

const carsRouter = require("./cars/cars-router.js");

const server = express();

// DO YOUR MAGIC
server.use(express.json());

server.use("/api/cars", carsRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "There was an error",
  });
});

module.exports = server;
