const express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./server/config/db"),
  env = require("./server/config/env"),
  router = require("./server/router/index"),
  cors = require("cors");

// morgan = require("morgan"),
app = express();

// app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

app.use(cors({ origin: "*" }));
router(app, db);

const PORT = 8080;

db.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Express listening on port:", PORT);
    });
  })
  .catch((error) => console.log(error));
