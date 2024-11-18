// Users.js
'use strict'

const { DataTypes } = require('sequelize')
const Users = require('./userModal')
const sequelize = require('../db/db')

const UserFiles = sequelize.define(
  'UserFiles',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users, // References the Users model
        key: 'id' // Assumes Users model has a primary key called 'id'
      }
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    filetype: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    }
  },
  {
    sequelize,
    tableName: 'UserFiles',
    timestamps: true
  }
)

module.exports = UserFiles
