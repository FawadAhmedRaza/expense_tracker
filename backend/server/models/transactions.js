"use strict";
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define(
    "transactions",

    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
      },

      asset_id: {
        type: DataTypes.INTEGER,
      },
      exp_id: {
        type: DataTypes.INTEGER,
      },
      expense_date: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.DECIMAL,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return transactions;
};
