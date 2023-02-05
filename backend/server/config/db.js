"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const env = require("./env");

const sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
  }
);

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("../models/user")(sequelize, Sequelize);
db.transactions = require("../models/transactions")(sequelize, Sequelize);
db.assets = require("../models/assets")(sequelize, Sequelize);
db.expense_heads = require("../models/expense_heads")(sequelize, Sequelize);

// db.assets.hasOne(db.transactions, { foreignKey: "asset_id", targetKey: "id" });
// db.expense_heads.hasOne(db.transactions, {
//   foreignKey: "exp_id",
//   targetKey: "id",
// });
db.transactions.belongsTo(db.assets, {
  foreignKey: "asset_id",
  targetKey: "id",
});
db.transactions.belongsTo(db.expense_heads, {
  foreignKey: "exp_id",
  targetKey: "id",
});

db.assets.hasMany(db.transactions, {
  foreignKey: "id",
  targetKey: "asset_id",
});
module.exports = db;
