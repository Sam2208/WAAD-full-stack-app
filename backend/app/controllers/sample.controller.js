const Sample = require("../models/sample.model.js");

// Create and Save a new Sample
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Sample
  const sample = new Sample({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Sample in the database
  Sample.create(sample, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sample."
      });
    else res.send(data);
  });
};

// Retrieve all Samples from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Sample.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving samples."
      });
    else res.send(data);
  });
};

// Find a single Sample by Id
exports.findOne = (req, res) => {
  Sample.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sample with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Sample with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Samples
exports.findAllPublished = (req, res) => {
  Sample.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Samples."
      });
    else res.send(data);
  });
};

// Update a Sample identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Sample.updateById(
    req.params.id,
    new Sample(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Sample with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Sample with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Sample with the specified id in the request
exports.delete = (req, res) => {
  Sample.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sample with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Sample with id " + req.params.id
        });
      }
    } else res.send({ message: `Sample was deleted successfully!` });
  });
};

// Delete all Samples from the database.
exports.deleteAll = (req, res) => {
  Sample.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Samples."
      });
    else res.send({ message: `All Samples were deleted successfully!` });
  });
};
