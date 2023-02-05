const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/db");
const { Op } = require("sequelize");
module.exports = (db) => {
  return {
    create: (req, res) => {
      const { description, asset_id, exp_id, amount, expense_date, user_id } =
        req.body;
      const data = {
        description,
        asset_id,
        exp_id,
        amount,
        expense_date,
        user_id,
      };

      db.transactions
        .create(data)
        .then((result) =>
          res.status(201).send({
            statusCode: 201,
            status: "ok",
            message: "Transactions has been created successfully!",
          })
        )
        .catch((err) => res.status(400).send(err));
    },

    list: (req, res) => {
      db.transactions
        .findAll({
          attributes: [
            "id",
            [sequelize.literal("expense_head.title"), "expense_title"],
            [sequelize.literal("asset.asset_name"), "asset_name"],
            [
              sequelize.fn("MONTH", sequelize.col("transactions.expense_date")),
              "month",
            ],
            "amount",
            "expense_date",
            "created_at",
            "updated_at",
          ],
          include: [
            {
              model: db.assets,
              attributes: [],
              required: false,
            },
            {
              model: db.expense_heads,
              attributes: [],
              required: false,
            },
          ],
        })
        .then((result) => {
          res.status(200).send({ status: "ok", statusCode: 200, data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    },
    listBetweenDates: (req, res) => {
      const startDate = new Date(`${req.body.startDate} 00:00:00`);
      const endDate = new Date(`${req.body.endDate} 23:59:59`);
      const where = {
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      };
      db.transactions
        .findAll({ where })
        .then((result) => {
          res.status(200).send({ status: "ok", statusCode: 200, data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    },
  };
};
