const { createServer, proxy } = require("http-proxy");
const { parse } = require("url");
const path = require("path");
const fs = require("fs");

const distDir = path.resolve(__dirname, "../../dist/photo-gallary");

const requestHandler = (req, res) => {
  const parsedUrl = parse(req.url, true);
  let { pathname } = parsedUrl;

  if (pathname.startsWith("/api/")) {
    proxy.web(req, res, { target: "http://localhost:4200" });
  } else {
    fs.readFile(path.join(distDir, "browser", pathname), (err, data) => {
      if (err) {
        fs.readFile(
          path.join(distDir, "browser", "index.html"),
          (err, data) => {
            if (err) {
              res.writeHead(404);
              res.end("Not Found");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(data);
            }
          }
        );
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
};

const server = createServer(requestHandler);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
