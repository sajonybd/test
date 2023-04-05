const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  let url = req.query.url ? decodeURI(req.query.url) : "https://example.com";
  let ua = req.query.browser ? decodeURIComponent(req.query.browser) : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
  scrapeLogic(res,url,ua);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running! v1.0.4");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
