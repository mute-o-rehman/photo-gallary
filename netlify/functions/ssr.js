const { createServer } = require("http");
const { parse } = require("url");
const path = require("path");
const fs = require("fs");
const { app } = require("../../dist/photo-gallary/server/main");

const distDir = path.resolve(__dirname, "../../dist/photo-gallary/browser");

const requestHandler = (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  if (pathname.startsWith("/api/")) {
    proxy.web(req, res, { target: "http://localhost:4200" });
  } else {
    fs.readFile(path.join(distDir, pathname), (err, data) => {
      if (err) {
        fs.readFile(path.join(distDir, "index.html"), (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end("Not Found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
};

const server = createServer(app());

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
