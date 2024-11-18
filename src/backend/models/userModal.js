// Users.js
"use strict";

const { DataTypes } = require("sequelize");

const sequelize = require("../db/db");
const Bot_creator = require("./Bot_creator");

const Users = sequelize.define(
  "Users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = Users;
