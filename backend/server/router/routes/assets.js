"use strict";
module.exports = (app, db) => {
  var router = require("express").Router();
  var controller = require("../../controller/assets")(db);

  router.route("/assets").post(controller.create);
  router.route("/assets").get(controller.list);

  app.use(router);
};
