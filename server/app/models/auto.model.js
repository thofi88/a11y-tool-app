const sql = require("./db.js");

// REVIEW Moduls with SQL Query Function to connentet with database.

// SECTION Auto Module

const Auto = function (auto) {
  this.automated = auto.automated;
};

// ANCHOR FindById - Auto Module
Auto.findById = (autoId, result) => {
  sql.query(`SELECT * FROM auto WHERE id = ${autoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found auto: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// ANCHOR Update - Auto Module
Auto.updateById = (id, auto, result) => {
  sql.query(
    "UPDATE auto SET automated = ? WHERE id = ?",
    [auto.automated, id],
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

      console.log("updated auto: ", { id: id, ...auto });
      result(null, { id: id, ...auto });
    }
  );
};

module.exports = Auto;

// !SECTION
