const { AxePuppeteer } = require('axe-puppeteer')
const puppeteer = require('puppeteer')

const request = require('request-promise');
const timestamp = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '')

const {
  setIntervalAsync
} = require('set-interval-async/fixed')

const timer = setIntervalAsync(
  async () => {
    console.log('Hello')
    await callback()
    console.log('Bye')
  },
  60000
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
                const websiteRankingArray = [];
                await request(`http://server:8000/websiteCheck/${website.id}`, { json: true }, async (err, res, body) => { }).then(

                  async function (response) {

                    const checks = response;

                    // console.log(checks)
                    for await (check of checks) {
                      const checkUrl = check.url;
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

                        await request('http://server:8000/websites/', { json: true }, async (err, res, body) => { }).then(
                          async function (response) {

                            const url = 'http://server:8000/websiteCheckResultPut/' + id

                            const resultAsString = JSON.stringify(results)
                            await request({ url: url, method: 'put', json: true, body: { result: resultAsString, check_time: timestamp, checked: 1, ranking: ranking } }, () => {
                              console.log('UpdateCheck-request');

                            })


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

