const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400) {
    console.error('Bad JSON');
    res.send('{"error":"Invalid Request Data"}');
  }
});


app.post('/v1', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let data = req.body;
  let url = data.url ? decodeURI(data.url) : "https://example.com";
  let ua = data.browser ? decodeURIComponent(data.browser) : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
  let proxy = data.proxy ? decodeURIComponent(data.proxy) : "";
  let method = data.method ? data.method.toUpperCase() : "GET";
  let header = data.headers ? JSON.stringify(data.headers) : '["X-Powered-By: Cloudflare"]';
  let cookie = data.cookie ? data.cookie : '';
  scrapeLogic(res,url,ua,header,proxy,cookie,method,data.data);
})

app.get("/", (req, res) => {
  res.send("Welcome to Scrape Master v1.0.9!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
