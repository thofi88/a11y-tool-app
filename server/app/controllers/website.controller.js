const Website = require("../models/website.model.js");

// Create and Save a new Website
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

  }

  // Create a Website
  const website = new Website({
    name: req.body.name,
    home_url: req.body.home_url,
    last_full_test: req.body.last_full_test,
    category_id: req.body.category_id,
    ranking: req.body.ranking,
  });

  // Save Website in the database
  Website.create(website, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Website."
      });
    else res.send(data);
  });
};

// Retrieve all Websites from the database.
exports.findAll = (req, res) => {
  Website.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving websites."
      });
    else res.send(data);
  });
};

// Find a single Website with a websiteId
exports.findOne = (req, res) => {
  Website.findById(req.params.websiteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Website with id ${req.params.websiteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Website with id " + req.params.websiteId
        });
      }
    } else res.send(data);
  });
};

// Find a single Check with a websiteUrl
exports.findCheck = (req, res) => {
  Website.findCheckById(req.params.websiteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Website with id ${req.params.websiteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Website with id " + req.params.websiteId
        });
      }
    } else res.send(data);
  });
};

// Update a Website identified by the websiteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Website.updateById(
    req.params.websiteId,
    new Website(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Website with id ${req.params.websiteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Website with id " + req.params.websiteId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Website with the specified websiteId in the request
exports.delete = (req, res) => {
  Website.remove(req.params.websiteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Website with id ${req.params.websiteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Website with id " + req.params.websiteId
        });
      }
    } else res.send({ message: `Website was deleted successfully!` });
  });
};

// Delete all Websites from the database.
exports.deleteAll = (req, res) => {
  Website.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all websites."
      });
    else res.send({ message: `All Websites were deleted successfully!` });
  });
};
