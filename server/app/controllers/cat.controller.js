const Cat = require("../models/cat.model.js");

// REVIEW Category controller to monitoring API Inputs. Is the core managment for the server.

// SECTION Category Controller
// ANCHOR Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

  }

  // ANCHOR Create a Object called Category
  const cat = new Cat({
    name: req.body.name,
  });

  // ANCHOR Save Category in the database
  Cat.create(cat, (err, data) => {
    console.log(cat);
    if (err)
      res.status(500).send({
        message:
          err.message || "Error by fetching Website."
      });
    else res.send(data);
  });
};

// ANCHOR Return all Categories from the database.
exports.findAll = (req, res) => {
  Cat.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error by fetching Website."
      });
    else res.send(data);
  });
};

// ANCHOR Find a single Category find by categoryID
exports.findOne = (req, res) => {
  Cat.findById(req.params.catId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.catId}.`
        });
      } else {
        res.status(500).send({
          message: "Error by fetching Category with id " + req.params.catId
        });
      }
    } else res.send(data);
  });
};


// ANCHOR Update a Category identified by the categoryID
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request body is not empty!"
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
            message: `Not found Category with id ${req.params.catId}.`
          });
        } else {
          res.status(500).send({
            message: "Error by fetching Category with id " + req.params.catId
          });
        }
      } else res.send(data);
    }
  );
};

// ANCHOR Delete a Category find by a specified categoryID
exports.delete = (req, res) => {
  Cat.remove(req.params.catId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cat with id ${req.params.catId}.`
        });
      } else {
        res.status(500).send({
          message: "Error by fetching Category with id " + req.params.catId
        });
      }
    } else res.send({ message: `Category was deleted successfully!` });
  });
};

// ANCHOR Remove all Categories from the database.
exports.deleteAll = (req, res) => {
  Cat.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Error by fetching Website."
      });
    else res.send({ message: `All Categories deleted.` });
  });
};

// !SECTION
