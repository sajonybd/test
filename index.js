const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/v1', (req, res) => {
  let data = req.body;
  let url = data.url ? decodeURI(data.url) : "https://example.com";
  let ua = data.browser ? decodeURIComponent(data.browser) : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
  let proxy = data.proxy ? decodeURIComponent(data.proxy) : "";
  let header = data.headers ? JSON.stringify(data.headers) : '["X-Powered-By: Cloudflare"]';
  let cookie = data.cookie ? decodeURIComponent(data.cookie) : '';
  scrapeLogic(res,url,ua,header,proxy,cookie);
})

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running! v1.0.6");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
