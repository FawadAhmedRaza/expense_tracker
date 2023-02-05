"use strict";
module.exports = (app, db) => {
  var router = require("express").Router();
  var controller = require("../../controller/expense_heads")(db);

  router.route("/expense_heads").post(controller.create);
  router.route("/expense_heads").get(controller.list);

  app.use(router);
};
