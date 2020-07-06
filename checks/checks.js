#!/usr/bin/env node

// const cors = require('cors');
// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
const { exec } = require("child_process");
const fs = require('fs');
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

        const checkUrl = checks[i].url;
        const result = checks[i].result;
        const checked = checks[i].checked;
        const id = checks[i].id;

        if (checked === 0) {
          console.log('noch nicht gecheckt');
          if (i === 0) {

            const cmd = 'axe ' + checkUrl.toString() + ' --save ./axe-results/' + id + '.json';
            console.log(cmd);
            exec(cmd, (err, stdout, stderr) => {
              if (err) {
                // node couldn't execute the command
                return;
              }

              // the *entire* stdout and stderr (buffered)
              console.log(`stdout: ${stdout}`);
              console.log(`stderr: ${stderr}`);

              let rawdata = fs.readFileSync('./axe-results/' + id + '.json');
              let fileResult = JSON.parse(rawdata);
              let resultAsString = JSON.stringify(fileResult)
              console.log(resultAsString);

              // FIXME PUT not work
              request({ url: 'http://localhost:8000/websiteCheckResultPut/' + id, method: 'PUT', json: {result: resultAsString, check_time: "2025-06-28 13:26:40"}})

            });
          }
        }

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
