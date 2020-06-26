const Cat = require("../models/cat.model.js");

// Create and Save a new Cat
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

  }

  // Create a Cat
  const cat = new Cat({
    name: req.body.name,
  });

  // Save Cat in the database
  Cat.create(cat, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cat."
      });
    else res.send(data);
  });
};

// Retrieve all Cats from the database.
exports.findAll = (req, res) => {
  Cat.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cats."
      });
    else res.send(data);
  });
};

// Find a single Cat with a catId
exports.findOne = (req, res) => {
  Cat.findById(req.params.catId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cat with id ${req.params.catId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cat with id " + req.params.catId
        });
      }
    } else res.send(data);
  });
};

// Find a single Check with a catUrl
exports.findCheck = (req, res) => {
  Cat.findCheckById(req.params.catId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cat with id ${req.params.catId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cat with id " + req.params.catId
        });
      }
    } else res.send(data);
  });
};

// Update a Cat identified by the catId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Cat.updateById(
    req.params.catId,
    new Cat(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cat with id ${req.params.catId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cat with id " + req.params.catId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Cat with the specified catId in the request
exports.delete = (req, res) => {
  Cat.remove(req.params.catId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cat with id ${req.params.catId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cat with id " + req.params.catId
        });
      }
    } else res.send({ message: `Cat was deleted successfully!` });
  });
};

// Delete all Cats from the database.
exports.deleteAll = (req, res) => {
  Cat.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cats."
      });
    else res.send({ message: `All Cats were deleted successfully!` });
  });
};
