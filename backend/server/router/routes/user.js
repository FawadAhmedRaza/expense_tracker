"use strict";
module.exports = (app, db) => {
  var router = require("express").Router();
  var controller = require("../../controller/user")(db);

  router.route("/auth/login").post(controller.signin);
  router.route("/auth/register").post(controller.signup);

  app.use(router);
};
