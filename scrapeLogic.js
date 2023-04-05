const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res,url,ua,hd) => {
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
    await page.setUserAgent(ua);
    // await page.setExtraHTTPHeaders(hd);

 // enable request interception
await page.setRequestInterception(true);
// add header for the navigation requests
page.on('request', request => {
  // Do nothing in case of non-navigation requests.
  if (!request.isNavigationRequest()) {
    request.continue();
    return;
  }

 const header = [hd];

  // Add a new header for navigation request.
  const headers = request.headers();
  // headers['X-Just-Must-Be-Request-In-Main-Request'] = 1;
  for(let i = 0; i < header.length; i++) {
    const [key, value] = header[i].split(': ');
    headers[key] = value;
  }
  console.log(headers);
  request.continue({ headers });
});
// navigate to the website
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
