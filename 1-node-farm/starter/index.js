const http = require("http");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.stringify(data);
const server = http.createServer((req, res) => {
  var pathname = req.url;

  if (pathname == "/" || pathname == "/overview") {
    res.end("This is overview");
  } else if (pathname == "/home") {
    res.end("This is home");
  } else if (pathname == "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(JSON.parse(dataObj));
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
