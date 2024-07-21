// ssr.js
const express = require("express");
const { ngExpressEngine } = require("@nguniversal/express-engine");
const { AppServerModule } = require("./dist/photo-gallary/server/main");
const {
  provideModuleMap,
} = require("@nguniversal/module-map-ngfactory-loader");
const path = require("path");

const app = express();

const DIST_FOLDER = path.join(process.cwd(), "dist/photo-gallary/browser");

app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModule,
    providers: [provideModuleMap()],
  })
);

app.set("view engine", "html");
app.set("views", DIST_FOLDER);

app.get(
  "*.*",
  express.static(DIST_FOLDER, {
    maxAge: "1y",
  })
);

app.get("*", (req, res) => {
  res.render("index", { req });
});

app.listen(4000, () => {
  console.log(`Node server listening on http://localhost:4000`);
});
