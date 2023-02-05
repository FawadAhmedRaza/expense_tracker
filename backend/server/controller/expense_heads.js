const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  return {
    create: (req, res) => {
      const { title, user_id } = req.body;
      const data = {
        title,
        user_id,
      };

      db.expense_heads
        .create(data)
        .then((result) =>
          res.status(201).send({
            statusCode: 201,
            status: "ok",
            message: "Expense Type has been created successfully!",
          })
        )
        .catch((err) => res.status(400).send(err));
    },

    list: (req, res) => {
      db.expense_heads
        .findAll()
        .then((result) => {
          res.status(200).send({ status: "ok", statusCode: 200, data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    },
  };
};
