// Users.js
'use strict'

const { DataTypes } = require('sequelize')
const Users = require('./userModal')
const sequelize = require('../db/db')

const UserVerification = sequelize.define(
  'UserVerifications',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users, // References the Users model
        key: 'id' // Assumes Users model has a primary key called 'id'
      }
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    verificationCodeCreatedAt: {
      type: DataTypes.DATE, // Track when the code was created
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    tableName: 'UserVerifications',
    timestamps: true
  }
)

module.exports = UserVerification
