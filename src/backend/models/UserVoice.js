// Users.js
'use strict'

const { DataTypes } = require('sequelize')
const Users = require('./userModal')
const sequelize = require('../db/db')

const UserVoice = sequelize.define(
  'UserVoice',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users, // References the Users model
        key: 'id' // Assumes Users model has a primary key called 'id'
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    tone: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    voice_id: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true // Will be null after verification
    }
  },
  {
    sequelize,
    tableName: 'UserVoice',
    timestamps: true
  }
)

module.exports = UserVoice
