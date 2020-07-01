const sql = require("./db.js");

// REVIEW Moduls with SQL Query Function to connentet with database.

// SECTION Category Module
// ANCHOR Create a Object called Cat
const Cat = function(cat) {
  this.name = cat.name;
};

// ANCHOR Create - Category Module
Cat.create = (newCat, result) => {
  sql.query("INSERT INTO category SET ?", newCat, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cat: ", { id: res.insertId, ...newCat });
    result(null, { id: res.insertId, ...newCat });
  });
};

// ANCHOR FindById - Category Module
Cat.findById = (catId, result) => {
  sql.query(`SELECT * FROM category WHERE id = ${catId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cat: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cat with the id
    result({ kind: "not_found" }, null);
  });
};

// ANCHOR GetAll - Category Module
Cat.getAll = result => {
  sql.query("SELECT * FROM category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cats: ", res);
    result(null, res);
  });
};

// ANCHOR Update - Category Module
Cat.updateById = (id, cat, result) => {
  sql.query(
    "UPDATE cats SET name = ?, home_url = ?, access_time = ? WHERE id = ?",
    [cat.name, cat.home_url, cat.access_time, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Cat with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cat: ", { id: id, ...cat });
      result(null, { id: id, ...cat });
    }
  );
};

// ANCHOR Remove - Category Module
Cat.remove = (id, result) => {
  sql.query("DELETE FROM cats WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cat with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cat with id: ", id);
    result(null, res);
  });
};

// ANCHOR RemoveAll Category Module
Cat.removeAll = result => {
  sql.query("DELETE FROM cats", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cats`);
    result(null, res);
  });
};

module.exports = Cat;

// !SECTION
