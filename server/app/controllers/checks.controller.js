const Checks = require("../models/checks.model.js");

// REVIEW Check controller to monitoring API Inputs. Is the core managment for the server.

// SECTION Check Module
// ANCHOR Create and Save a new Check
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Request body is not empty!"
    });

  }

  // ANCHOR Create a Object called Check
  const checks= new Checks({
    website_id: req.body.website_id,
    website_name: req.body.website_name,
    url: req.body.url,
    check_time: req.body.check_time,
    result: req.body.result,
    checked: req.body.checked
  });

  // ANCHOR Save Check in the database
  Checks.create(checks, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error by fetching Website."
      });
    else res.send(data);
  });
};

// ANCHOR Find a single Checks with a catId
exports.findOneCheck = (req, res) => {
  Checks.findById(req.params.checkId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Check with id ${req.params.checkId}.`
        });
      } else {
        res.status(500).send({
          message: "Errorby fetching Check with id " + req.params.checkId
        });
      }
    } else res.send(data);
  });
};

// ANCHOR Find a single Check with a checksId
exports.findAllChecks = (req, res) => {
  Checks.getAll(req.params.websiteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Checks with id ${req.params.websiteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error by fetching Checks with id " + req.params.websiteId
        });
      }
    } else res.send(data);
  });
};


// ANCHOR Update a Check identified by the ChecksId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request body is not empty!"
    });
  }

  console.log(req.body);

  Checks.updateById(
    req.params.checkId,
    new Checks(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Checks with id ${req.params.checkId}.`
          });
        } else {
          res.status(500).send({
            message: "Error by fetching with id " + req.params.checkId
          });
        }
      } else res.send(data);
    }
  );
};

// ANCHOR Update a Check identified by the ChecksId in the request
exports.updateResult = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request body is not empty!"
    });
  }

  console.log(req.body);

  Checks.updateResultById(
    req.params.checkId,
    new Checks(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Checks with id ${req.params.checkId}.`
          });
        } else {
          res.status(500).send({
            message: "Error by fetching with id " + req.params.checkId
          });
        }
      } else res.send(data);
    }
  );
};

// ANCHOR Delete a Check find by a specified checksId
exports.delete = (req, res) => {
  console.log('delete' + req.params.checksId);
  Checks.remove(req.params.checksId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Checks with id ${req.params.checksId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Checks with id " + req.params.checksId
        });
      }
    } else res.send({ message: `Checks was deleted successfully!` });
  });
};

// !SECTION
