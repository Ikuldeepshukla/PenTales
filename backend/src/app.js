const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

// for swagger documentation
// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// temp-setup template engine
// app.set("view engine", "ejs");

// cookies and file middleware
app.use(cookieParser());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// morgan middleware
app.use(morgan("tiny"));

// routes
const routes = require("./routes/routes.main");
app.use("/api/v1/", routes);

// export app js
module.exports = app;
