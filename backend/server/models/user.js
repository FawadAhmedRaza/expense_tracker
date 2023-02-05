"use strict";
module.exports = (sequelize, DataTypes) => {
  const branches = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        required: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        required: true,
      },

      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.INTEGER,
        required: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return branches;
};
