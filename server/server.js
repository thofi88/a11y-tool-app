const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// SECTION App server start script
app.use(function(req, res, next) {

  // NOTE Orgin allow for request from the same source
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});
// NOTE parse the requests
app.use(bodyParser.json());

// parse requests url
app.use(bodyParser.urlencoded({ extended: true }));


// NOTE simple route
app.get("/", (req, res) => {
  res.json({ message: "API Accessible Tool" });
});

// NOTE Import Routes
require("./app/routes/website.routes.js")(app);

// NOTE use cors to read Port from docker compose file
app.use(cors());

// NOTE App listen on server port 8000
app.listen(process.env.ANGULAR_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.ANGULAR_APP_SERVER_PORT}`);
});

// !SECTION

