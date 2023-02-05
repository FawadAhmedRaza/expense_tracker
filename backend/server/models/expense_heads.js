"use strict";
module.exports = (sequelize, DataTypes) => {
  const expense_heads = sequelize.define(
    "expense_heads",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
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

  return expense_heads;
};
