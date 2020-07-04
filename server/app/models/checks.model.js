const sql = require("./db.js");

// REVIEW Moduls with SQL Query Function to connentet with database.

// SECTION Check Module
// ANCHOR Create a Object called Check
const Checks = function(checks) {
  this.website_name = checks.website_name;
  this.website_id = checks.website_id;
  this.url = checks.url;
  this.check_time = checks.check_time;
  this.result = checks.result;
};

// ANCHOR Create - Check Module
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

// ANCHOR FindById - Check Module
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

    result({ kind: "not_found" }, null);
  });
};

// ANCHOR GetAll - Check Module
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

// ANCHOR Update - Check Module
Checks.updateById = (id, checks, result) => {
  sql.query(
    "UPDATE checks SET website_name = ?, url = ? WHERE id = ?",
    [checks.website_name, checks.url, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Checks: ", { id: id, ...Checks });
      result(null, { id: id, ...Checks });
    }
  );
};

// ANCHOR Remove - Check Module
Checks.remove = (id, result) => {
  console.log( 'remove' + id);
  sql.query("DELETE FROM checks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Checks with id: ", id);
    result(null, res);
  });
};

module.exports = Checks;

// !SECTION
