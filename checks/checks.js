const { exec } = require("child_process");
const fs = require('fs');
const request = require('request');
const timestamp = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '')

// function callback() {
//   console.log("Callback Funktion wird aufgerufen");
// }

request(`http://localhost:8000/auto/0`, { json: true }, (err, res, body) => {

  automated = body.automated;
  console.log(automated);
  if (automated === 1) {



    request('http://localhost:8000/websites/', { json: true }, (err, res, body) => {

      websites = body;
      console.log();
      for (let i = 0; i < websites.length; i++) {

        // console.log(`http://localhost:8000/websiteOneCheck/${websites[i].id}`);
        // console.log('');

        request(`http://localhost:8000/websiteCheck/${websites[i].id}`, { json: true }, (err, res, body) => {
          checks = body;
          for (let i = 0; i < checks.length; i++) {

            // console.log(checks[i].url);

            const checkUrl = checks[i].url;
            const result = checks[i].result;
            const checked = checks[i].checked;
            const id = checks[i].id;

            if (checked === 0) {
              // console.log('noch nicht gecheckt');

              const cmd = 'axe ' + checkUrl.toString() + ' --save ' + id + '.json';
              // console.log(cmd);
              exec(cmd, (err, stdout, stderr) => {
                if (err) {
                  // node couldn't execute the command
                  return;
                }

                // the *entire* stdout and stderr (buffered)
                // console.log(`stdout: ${stdout}`);
                // console.log(`stderr: ${stderr}`);

                let rawdata = fs.readFileSync(id + '.json');
                let fileResult = JSON.parse(rawdata);
                let resultAsString = JSON.stringify(fileResult)
                // console.log(resultAsString);

                const url = 'http://localhost:8000/websiteCheckResultPut/' + id
                // console.log(timestamp)


                request({ url: url, method: 'put', json: true, body: { result: resultAsString, check_time: timestamp, checked: 1 } }, () => {
                  fs.unlinkSync(id + '.json');
                })

              });
            }
          }
        });
      }
    });
  }
  // setTimeout(callback, 3000);
});
