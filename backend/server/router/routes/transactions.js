"use strict";
module.exports = (app, db) => {
  var router = require("express").Router();
  var controller = require("../../controller/transactions")(db);

  router.route("/transactions").post(controller.create);
  router.route("/transactions").get(controller.list);
  router.route("/transactionsbydate").get(controller.listBetweenDates);

  app.use(router);
};
