// Users.js
'use strict'

const { DataTypes } = require('sequelize')
const Users = require('./userModal')

const sequelize = require('../db/db')

const Bot_creator = sequelize.define(
  'Bot_creator',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users, // References the Users model
        key: 'id' // Assumes Users model has a primary key called 'id'
      }
    },
    voice_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar_img: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Bot_creator',
    timestamps: true
  }
)

module.exports = Bot_creator
