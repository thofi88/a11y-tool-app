const sql = require("./db.js");


// REVIEW Moduls with SQL Query Function to connentet with database.

// SECTION Website Module
// ANCHOR Create a Object called Website
const Website = function (website) {
  this.name = website.name;
  this.home_url = website.home_url;
  this.last_full_test = website.last_full_test;
  this.category_id = website.category_id;
  this.ranking = website.ranking;
};

// ANCHOR Create - Website Module
Website.create = (newWebsite, result) => {
  sql.query("INSERT INTO websites SET ?", newWebsite, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created website: ", { id: res.insertId, ...newWebsite });
    result(null, { id: res.insertId, ...newWebsite });
  });
};

// ANCHOR FindById - Website Module
Website.findById = (websiteId, result) => {
  sql.query(`SELECT * FROM websites WHERE id = ${websiteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found website: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// ANCHOR GetAll - Website Module
Website.getAll = result => {
  sql.query("SELECT * FROM websites", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("websites: ", res);
    result(null, res);
  });
};

// ANCHOR GetLastID Website Module
Website.getId = result => {
  sql.query("SELECT MAX(id) FROM websites", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("websites: ", res);
    result(null, res);
  });
};

// ANCHOR Update - Website Module
Website.updateById = (id, website, result) => {
  sql.query(
    "UPDATE websites SET name = ?, home_url = ?, category_id = ? WHERE id = ?",
    [website.name, website.home_url, website.category_id, id],
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

      console.log("updated website: ", { id: id, ...website });
      result(null, { id: id, ...website });
    }
  );
};

// ANCHOR Remove - Website Module
Website.remove = (id, result) => {
  sql.query("DELETE FROM websites WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted website with id: ", id);
    result(null, res);
  });
};

// ANCHOR RemoveAll Website Module
Website.removeAll = result => {
  sql.query("DELETE FROM websites", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} websites`);
    result(null, res);
  });
};

module.exports = Website;

// !SECTION
