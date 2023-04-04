const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res,url) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    headless: true
  });
  try {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const content = await page.content();

    // Print the full page
    res.send(JSON.stringify(content));
  } catch (e) {
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
