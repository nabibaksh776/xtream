// Users.js
'use strict';

const { DataTypes } = require("sequelize");
const Users = require('./userModal')
const sequelize = require("../db/db");

const Integration = sequelize.define(
  "Integration",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users, // References the Users model
        key: 'id' // Assumes Users model has a primary key called 'id'
      }
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Integration",
    timestamps: true,
  }
);

module.exports = Integration;
