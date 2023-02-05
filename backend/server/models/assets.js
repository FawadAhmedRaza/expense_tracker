"use strict";
module.exports = (sequelize, DataTypes) => {
  const assets = sequelize.define(
    "assets",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      asset_name: {
        type: DataTypes.STRING,
      },
      book_value: {
        type: DataTypes.STRING,
      },
      user_id:{
        type:DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return assets;
};
