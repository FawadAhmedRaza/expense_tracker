"use strict";

const routes = [
  require("./routes/user"),
  require("./routes/transactions"),
  require("./routes/expense_heads"),
  require("./routes/assets"),
];

module.exports = function router(app, db) {
  return routes.forEach((route) => {
    route(app, db);
  });
};
