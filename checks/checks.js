// const cors = require('cors');
// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

const request = require('request');
request('http://localhost:8000/websites/', { json: true }, (err, res, body) => {

  websites = body;
  console.log();
  for (let i = 0; i < websites.length; i++) {

    console.log(`http://localhost:8000/websiteOneCheck/${websites[i].id}`);
    console.log('');


    const requestCheck = require('request');
    requestCheck(`http://localhost:8000/websiteCheck/${websites[i].id}`, { json: true }, (err, res, body) => {
      checks = body;
      for (let i = 0; i < checks.length; i++) {
        console.log(checks[i].url);
      }


});

  }
});

// const request = require('request');
// request('http://localhost:8000/websites/', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });


// app.use(function(req, res, next) {

//   res.header("Access-Control-Allow-Origin", "*");

//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//   next();

// });
// // parse requests of content-type: application/json
// app.use(bodyParser.json());

// // parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Server for checks." });
// });

// //require("./app/routes/website.routes.js")(app);
// // set port, listen for requests
// app.use(cors());

// app.listen(3000, () => {
//   console.log(`App server now listening on port 3000`);
// });
