const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views/layouts/"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// * root

app.get("/", async (req, res) => {
  res.render("landing");
});

// * misc routes

app.use((req, res) => {
  res.status(404).send("404: Page Not Found");
});

app.listen(HTTP_PORT, () => {
  console.log(`Express HTTP server listening on port ${HTTP_PORT}`);
});
