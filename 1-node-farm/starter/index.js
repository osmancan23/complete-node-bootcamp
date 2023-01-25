const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replace_template");
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(query);

  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    let cardsHtml = dataObj
      .map((e) => replaceTemplate(templateCard, e))
      .join("");

    let overview = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(overview);
  } else if (pathname == "/product") {
    const product = dataObj[query.id];

    const productTemplate = replaceTemplate(templateProduct, product);

    res.end(productTemplate);
  } else if (pathname == "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(dataObj);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Not Found",
    });
    res.end("<h1>Not page found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
