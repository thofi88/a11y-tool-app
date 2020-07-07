const Auto = require("../models/auto.model.js");

// REVIEW Automation controller to monitoring API Inputs. Is the core managment for the server.

// SECTION Auto Controller
// ANCHOR Find a single Auto find by autoId
exports.findOne = (req, res) => {
  Auto.findById(req.params.autoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Auto with id ${req.params.autoId}.`
        });
      } else {
        res.status(500).send({
          message: "Error by fetching Auto with id " + req.params.autoId
        });
      }
    } else res.send(data);
  });
};

// ANCHOR Update a Auto identified by the autoId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request body is not empty!"
    });
  }

  Auto.updateById(
    req.params.autoId,
    new Auto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Auto with id ${req.params.autoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error by fetching Auto with id" + req.params.autoId
          });
        }
      } else res.send(data);
    }
  );
};

// !SECTION
