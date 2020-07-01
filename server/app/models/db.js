const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// REVIEW Create a Pool of connections to the database.

// SECTION Pool to Database - Module

const connection = mysql.createPool({
  connectionLimit : 100,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;

// !SECTION
