

// exec('npm install chromedriver', (err, stdout, stderr) => {
//   if (err) {
//     // node couldn't execute the command
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
// exec('npm install axe-cli -g', (err, stdout, stderr) => {
//   if (err) {
//     // node couldn't execute the command
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });

// FIXME need to do with axe webdriver.js


// var AxeBuilder = require('axe-webdriverjs');

// const { Builder } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');

// require('geckodriver');
// const serverUri = "https://dequeuniversity.com/demo/mars/";
// let browser;

// async function main() {

//     const builder = new Builder()
//       .forBrowser('chrome')

//     browser = await builder.build();
//     await browser.get(serverUri);

//     try {
//         const title = await browser.getTitle();
//         console.log(title);
//     } catch (ex) {
//         console.log("Something went wrong", ex.message);
//     } finally {
//         await browser.quit();
//     }

// }

// main().catch(console.error);

// var driver = new WebDriver.Builder()
//   .withCapabilities(chromeCapabilities)
//   .forBrowser('chrome')
//   .build();

// driver
//   .get('https://dequeuniversity.com/demo/mars/')
//   .then(function () {
//     AxeBuilder(driver).analyze(function (err, results) {
//       if (err) {
//         // Handle error somehow
//       }
//       console.log(results);
//     });
//   });

const { AxePuppeteer } = require('axe-puppeteer')
const puppeteer = require('puppeteer')


const { exec } = require("child_process");
const fs = require('fs');
const request = require('request-promise');
const timestamp = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '')

const {
  setIntervalAsync,
  clearIntervalAsync
} = require('set-interval-async/fixed')

// TODO  await clearIntervalAsync(timer) if alle gecheckt

// function check() {
//   request('http://localhost:8000/websiteCheck/', { json: true }, async (err, res, body) => {

//     console.log(Object.values(body[0])[0])
//     const countRow = Object.values(body[0])[0];
//     if (countRow > 0) {

//       console.log('noch seiten zum checken')


//     } else {
//       console.log('alle gecheckt')
//       // clearIntervalAsync(timer)
//     }

//   });


// }
// setInterval(check, 10000);

const timer = setIntervalAsync(
  async () => {
    console.log('Hello')
    await callback()
    console.log('Bye')
  },
  1000
)


async function callback() {
  await request('http://server:8000/auto/0', { json: true }, async (err, res, body) => { }).then(

    async function (response) {
      if (response) {

        const automated = response.automated;
        // console.log(automated);
        if (automated === 1) {
          await request('http://server:8000/websites/', { json: true }, async (err, res, body) => { }).then(
            async function (response) {
              const websites = response;
              for await (website of websites) {

                await request(`http://server:8000/websiteCheck/${website.id}`, { json: true }, async (err, res, body) => { }).then(

                  async function (response) {
                    const checks = response;
                    for await (check of checks) {
                      const checkUrl = check.url;
                      const result = check.result;
                      const checked = check.checked;
                      const id = check.id;

                        if (checked === 0) {
                          console.log(check.website_name)

                          const browser = await puppeteer.launch({
                            headless: true,
                            args: ['--no-sandbox'],
                          })
                          const page = await browser.newPage()
                          await page.setBypassCSP(true)

                          // Configure the navigation timeout
                          await page.setDefaultNavigationTimeout(0);

                          await page.goto(checkUrl.toString())

                          const config = {
                            reporter: "v1"
                          }

                          const results = await new AxePuppeteer(page).configure(config).analyze()
                          console.log(results)

                          await request('http://server:8000/websites/', { json: true }, async (err, res, body) => { }).then(
                            async function (response) {

                              const url = 'http://server:8000/websiteCheckResultPut/' + id

                              const resultAsString = JSON.stringify(results)
                              await request({ url: url, method: 'put', json: true, body: { result: resultAsString, check_time: timestamp, checked: 1 } }, () => {
                                console.log('UpdateCheck-request');

                              })


                            })
                          await page.close()
                          await browser.close()

                        }



                    }
                  }
                )


              }
            }
          )

        }
      }
    }

  )

  // await request('http://localhost:8000/auto/0', { json: true }, async (err, res, body) => {


  //   if (body) {

  //     const automated = body.automated;
  //     // console.log(automated);
  //     if (automated === 1) {

  //       await request('http://localhost:8000/websites/', { json: true }, async (err, res, body) => {

  //         websites = body;
  //         // console.log('Website-request');

  //         for await (website of websites) {
  //           console.log(website.home_url)
  //           await request(`http://localhost:8000/websiteCheck/${website.id}`, { json: true }, async (err, res, body) => {
  //             checks = body;
  //             for await (check of checks) {
  //               console.log(check.name)
  //             }

  //           })
  //         }

  //         // for (let i = 0; i < websites.length; i++) {


  //         //   await request(`http://localhost:8000/websiteCheck/${websites[i].id}`, { json: true }, async (err, res, body) => {
  //         //     checks = body;
  //         //     // console.log('WebsiteCheck-request');
  //         //     for (let i = 0; i < checks.length; i++) {


  //         //       const checkUrl = checks[i].url;
  //         //       const result = checks[i].result;
  //         //       const checked = checks[i].checked;
  //         //       const id = checks[i].id;
  //         //       // console.log(checkUrl);
  //         //       // console.log(checked);
  //         //       console.log(id);
  //         //       if (id === 2) {

  //         //       if (checked === 0) {



  //         //         console.log('noch nicht gecheckt');

  //         //         // const cmd = 'axe ' + checkUrl.toString() + ' --save ' + id + '.json';
  //         //         // console.log(cmd);
  //         //         // exec(cmd, (err, stdout, stderr) => {
  //         //         //   if (err) {
  //         //         //     // node couldn't execute the command
  //         //         //     return;
  //         //         //   }



  //         //         const browser = await puppeteer.launch({
  //         //           headless: true,
  //         //           args: ['--no-sandbox'],
  //         //         })
  //         //         const page = await browser.newPage()
  //         //         await page.setBypassCSP(true)

  //         //         // Configure the navigation timeout
  //         //         await page.setDefaultNavigationTimeout(0);

  //         //         await page.goto('https://dequeuniversity.com/demo/mars/')

  //         //         const config = {
  //         //           reporter: "v1"
  //         //         }

  //         //         const results = await new AxePuppeteer(page).configure(config).analyze()
  //         //         console.log(results)

  //         //         const url = 'http://server:8000/websiteCheckResultPut/' + id
  //         //         // console.log(timestamp)

  //         //         const resultAsString = JSON.stringify(results)
  //         //         request({ url: url, method: 'put', json: true, body: { result: resultAsString, check_time: timestamp, checked: 1 } }, () => {
  //         //           console.log('UpdateCheck-request');
  //         //           // console.log({ result: results, check_time: timestamp, checked: 1 })
  //         //           // fs.unlinkSync(id + '.json');

  //         //         })

  //         //         await page.close()
  //         //         await browser.close()

  //         //       }
  //         //       }
  //         //     }
  //         //   });
  //         // }
  //       });
  //     }
  //   }
  // });
}

