const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res,url) => {
  // const browser = await puppeteer.launch({
  //   args: [
  //     "--disable-setuid-sandbox",
  //     "--no-sandbox",
  //     "--single-process",
  //     "--no-zygote",
  //   ],
  //   executablePath:
  //     process.env.NODE_ENV === "production"
  //       ? process.env.PUPPETEER_EXECUTABLE_PATH
  //       : puppeteer.executablePath(),
  //   headless: true
  // });
  const browser = await puppeteer.launch({headless: false});
  try {
    const page = await browser.newPage();

    const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
    const headers = JSON.stringify(response.headers());
    const content = await page.content();

    // Print the full page
    let result = '{"header":'+headers+',"body":'+JSON.stringify(content)+'}';
    res.send(JSON.parse(result))
  } catch (e) {
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
