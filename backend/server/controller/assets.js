const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  return {
    create: (req, res) => {
      const { asset_name, book_value } = req.body;
      const data = {
        asset_name,
        book_value,
        user_id,
      };

      db.assets
        .create(data)
        .then((result) =>
          res.status(201).send({
            statusCode: 201,
            status: "ok",
            message: "Asset has been created successfully!",
          })
        )
        .catch((err) => res.status(400).send(err));
    },

    list: (req, res) => {
      db.assets
        .findAll({
          attributes: [
            "id",
            "asset_name",
            "book_value",
            [
              db.sequelize.literal(`book_value - SUM(transactions.amount)`),
              "balance",
            ],
            [db.sequelize.literal("SUM(transactions.amount)"), "expense"],
          ],
          include: [
            {
              model: db.transactions,
              attributes: [],
            },
          ],
          group: ["assets.id"],
          raw: true,
        })
        .then((result) => {
          res.status(200).send({ status: "ok", statusCode: 200, data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    },
  };
};
