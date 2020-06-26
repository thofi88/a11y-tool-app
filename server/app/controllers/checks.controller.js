const Checks = require("../models/checks.model.js");

// Create and Save a new Checks
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

  }

  // Create a Checks
  const checks= new Checks({
    website_id: req.body.website_id,
    website_name: req.body.website_name,
    url: req.body.url,
    check_time: req.body.check_time,
    result: req.body.result,
  });

  // Save Checks in the database
  Checks.create(checks, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Checks."
      });
    else res.send(data);
  });
};

// Retrieve all Checkss from the database.
// exports.findAll = (req, res) => {
//   Checks.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Checkss."
//       });
//     else res.send(data);
//   });
// };

// Find a single Cat with a catId
exports.findOneCheck = (req, res) => {
  Checks.findById(req.params.checkId, (err, data) => {
    if (err) {
      console.log("Fehler");
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Check with id ${req.params.checkId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Check with id " + req.params.checkId
        });
      }
    } else res.send(data);
  });
};

// Find a single Checks with a ChecksId
exports.findAllChecks = (req, res) => {
  Checks.getAll(req.params.websiteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Checks with id ${req.params.websiteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Checks with id " + req.params.websiteId
        });
      }
    } else res.send(data);
  });
};


// Update a Checks identified by the ChecksId in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Checks.updateById(
//     req.params.ChecksId,
//     new Checks(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Checks with id ${req.params.ChecksId}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Checks with id " + req.params.ChecksId
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// Delete a Checks with the specified ChecksId in the request
// exports.delete = (req, res) => {
//   Checks.remove(req.params.ChecksId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Checks with id ${req.params.ChecksId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Checks with id " + req.params.ChecksId
//         });
//       }
//     } else res.send({ message: `Checks was deleted successfully!` });
//   });
// };

// Delete all Checkss from the database.
// exports.deleteAll = (req, res) => {
//   Checks.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Checkss."
//       });
//     else res.send({ message: `All Checkss were deleted successfully!` });
//   });
// };
