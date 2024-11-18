// Users.js
'use strict'

const { DataTypes } = require('sequelize')
const Users = require('./userModal')
const sequelize = require('../db/db')

const UserBusiness = sequelize.define(
  'UserBusiness',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users, // References the Users model
        key: 'id' // Assumes Users model has a primary key called 'id'
      }
    },
    niche: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    target_audience: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
  },
  {
    sequelize,
    tableName: 'UserBusiness',
    timestamps: true
  }
)

module.exports = UserBusiness
