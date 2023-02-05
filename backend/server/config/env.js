"use strict";

const env = {
  DATABASE_NAME: process.env.DATABASE_NAME || "expense_tracker",
  DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || "root",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "",
  // DATABASE_PORT: process.env.DATABASE_PORT || 49170,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || "mysql",
  // DATABASE_INSTANCE: "VMI516718SQLEXPRESS",
  NODE_ENV: process.env.NODE_ENV || "development",
};

module.exports = env;
