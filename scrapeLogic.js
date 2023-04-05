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
  // const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  try {
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
    const response = await page.goto(url);
    
    const headers = JSON.stringify(response.headers());
    const content = await page.content();
    // await page.screenshot({path: 'screenshot.png'});
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
