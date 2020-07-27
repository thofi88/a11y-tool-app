const { AxePuppeteer } = require('axe-puppeteer')
const puppeteer = require('puppeteer')
const request = require('request-promise');
const timestamp = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '')
const {
  setIntervalAsync
} = require('set-interval-async/fixed');

// SECTION Check script
// NOTE Timer to call the callback function every 60 sec
const timer = setIntervalAsync(
  async () => {
    console.log('Hello')
    await callback()
    console.log('Bye')
  },
  60000
)

// ANCHOR function callback
async function callback() {

  // NOTE Request to find if must be checked or not
  await request('http://server:8000/auto/0', { json: true }, async (err, res, body) => { }).then(

    async function (response) {
      if (response) {
        const automated = response.automated;
        // console.log(automated);
        if (automated === 1) {
          // NOTE Request to find all websites
          await request('http://server:8000/websites/', { json: true }, async (err, res, body) => { }).then(
            async function (response) {
              const websites = response;

              // NOTE loop for all websites
              for await (website of websites) {
                const websiteRankingArray = [];

                // NOTE Request to find all checks from a website
                await request(`http://server:8000/websiteCheck/${website.id}`, { json: true }, async (err, res, body) => { }).then(

                  async function (response) {

                    const checks = response;

                    // NOTE loop for all checks
                    for await (check of checks) {
                      const checkUrl = check.url;
                      const checked = check.checked;
                      const id = check.id;

                      if (checked === 0) {
                        console.log(check.website_name)

                        // NOTE start up browser with puppeteer
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

                        // NOTE check website with AXE
                        const results = await new AxePuppeteer(page).configure(config).analyze()

                        console.log(results.url)
                        let ranking = 0;
                        if (results.passes && !results.violations) {
                          ranking = 100;
                        }
                        else {
                          ranking = 0;
                        }
                        if (results.passes && results.violations) {
                          let passes = results.passes
                          let violations = results.violations
                          let passesArrayLength = passes.length
                          let violationsArrayLength = violations.length

                          console.log(passesArrayLength)
                          console.log(violationsArrayLength)

                          ranking = Math.round((passesArrayLength / (violationsArrayLength + passesArrayLength)) * 100)
                        }
                        else {
                          ranking = 0;
                        }

                        websiteRankingArray.push(ranking);
                        console.log(websiteRankingArray);

                            const url = 'http://server:8000/websiteCheckResultPut/' + id
                            const resultAsString = JSON.stringify(results)

                            // NOTE Request to save the result and check ranking
                            await request({ url: url, method: 'put', json: true, body: { result: resultAsString, check_time: timestamp, checked: 1, ranking: ranking } }, () => {
                              console.log('UpdateCheck-request');

                            })

                        await page.close()
                        await browser.close()
                      }
                      else {
                        console.log(check.ranking);
                        websiteRankingArray.push(check.ranking);
                      }
                      console.log(websiteRankingArray);
                    }
                    summe = 0;
                    for (i = 0; i < websiteRankingArray.length; i++) {
                      summe += websiteRankingArray[i];
                    }
                    const websiteRanking = Math.round(summe / websiteRankingArray.length);
                    const urlWebsite = 'http://server:8000/websites/' + website.id

                    // NOTE Request to update website with ranking
                    await request({ url: urlWebsite, method: 'put', json: true, body: { name: website.name, home_url: website.home_url, category_id: website.category_id ,  ranking: websiteRanking } }, () => {
                      console.log('UpdateWebsite-request');

                    })
                  }
                )
              }
            }
          )
        }
      }
    }
  )
}
// !SECTION
