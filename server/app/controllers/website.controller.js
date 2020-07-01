const Website = require("../models/website.model.js");

// REVIEW Website controller to monitoring API Inputs. Is the core managment for the server.

// ANCHOR Create and Save a new Website
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request body is not empty!"
    });
  }

  // ANCHOR Create a Object called Website
  const website = new Website({
    name: req.body.name,
    home_url: req.body.home_url,
    last_full_test: req.body.last_full_test,
    category_id: req.body.category_id,
    ranking: req.body.ranking,
  });

  // ANCHOR Save Website in the database
  Website.create(website, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error by fetching Website."
      });
    else res.send(data);
  });
};

// ANCHOR Return all Websites from the database.
exports.findAll = (req, res) => {
  Website.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error by fetching Website."
      });
    else res.send(data);
  });
};

// ANCHOR Finds the ID that was last saved
exports.findOneId = (req, res) => {
  Website.getId((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error by fetching Website."
      });
    else res.send(data);
  });
};

// ANCHOR Find a single Website find by websiteId
exports.findOne = (req, res) => {
  Website.findById(req.params.websiteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Website with id ${req.params.websiteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error by fetching Website with id " + req.params.websiteId
        });
      }
    } else res.send(data);
  });
};

// ANCHOR Update a Website identified by the websiteId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request body is not empty!"
    });
  }

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
            message: "Error by fetching Website with id" + req.params.websiteId
          });
        }
      } else res.send(data);
    }
  );
};

// ANCHOR Delete a Website find by a specified websiteId
exports.delete = (req, res) => {
  Website.remove(req.params.websiteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Website with id ${req.params.websiteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error by fetching Website with id " + req.params.websiteId
        });
      }
    } else res.send({ message: `Website is deleted.` });
  });
};

// ANCHOR Remove all Websites from the database.
exports.deleteAll = (req, res) => {
  Website.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error by fetching Website."
      });
    else res.send({ message: `All Websites deleted.` });
  });
};
