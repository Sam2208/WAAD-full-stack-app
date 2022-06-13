module.exports = app => {
  const samples = require("../controllers/sample.controller.js");

  var router = require("express").Router();

  // Create a new Sample
  router.post("/", samples.create);

  // Retrieve all Samples
  router.get("/", samples.findAll);

  // Retrieve all published Samples
  router.get("/published", samples.findAllPublished);

  // Retrieve a single Sample with id
  router.get("/:id", samples.findOne);

  // Update a Sample with id
  router.put("/:id", samples.update);

  // Delete a Sample with id
  router.delete("/:id", samples.delete);

  // Delete all Samples
  router.delete("/", samples.deleteAll);

  app.use('/api/samples', router);
};
