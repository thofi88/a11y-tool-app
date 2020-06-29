const sql = require("./db.js");

const Checks = function(checks) {
  this.website_name = checks.website_name;
  this.website_id = checks.website_id;
  this.url = checks.url;
  this.check_time = checks.check_time;
  this.result = checks.result;
};

Checks.create = (newChecks, result) => {
  sql.query("INSERT INTO checks SET ?", newChecks, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Checks: ", { id: res.insertId, ...newChecks });
    result(null, { id: res.insertId, ...newChecks });
  });
};

Checks.findById = (checkId, result) => {
  sql.query(`SELECT * FROM checks WHERE id = ${checkId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Checks: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Checks with the id
    result({ kind: "not_found" }, null);
  });
};

Checks.getAll = (websiteId, result) => {
  sql.query(`SELECT * FROM checks WHERE website_id = ${websiteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Checks: ", res);
    result(null, res);
  });
};

// Checks.updateById = (id, Checks, result) => {
//   sql.query(
//     "UPDATE Checkss SET name = ?, home_url = ?, access_time = ? WHERE id = ?",
//     [Checks.name, Checks.home_url, Checks.access_time, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Checks with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated Checks: ", { id: id, ...Checks });
//       result(null, { id: id, ...Checks });
//     }
//   );
// };

// Checks.remove = (id, result) => {
//   sql.query("DELETE FROM Checkss WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Checks with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted Checks with id: ", id);
//     result(null, res);
//   });
// };

// Checks.removeAll = result => {
//   sql.query("DELETE FROM Checkss", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} Checkss`);
//     result(null, res);
//   });
// };

module.exports = Checks;
