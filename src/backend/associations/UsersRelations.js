// associations.js
const Users = require('../models/userModal')
const Bot_creator = require('../models/Bot_creator')
const Integration = require("../models/Integration")
const UserVerification = require("../models/userVerification")
const UserBusiness = require('../models/UserBusiness')
const UserFiles = require('../models/UserFiles')
const UserVoice = require('../models/UserVoice')


// Define associations between User and Bot_Creator
Bot_creator.belongsTo(Users, { foreignKey: 'user_id' })
Users.hasOne(Bot_creator, { foreignKey: 'user_id', onDelete: 'CASCADE' })

// Define associations between User and Integrations
Integration.belongsTo(Users, { foreignKey: 'user_id' })
Users.hasMany(Bot_creator, { foreignKey: 'user_id', onDelete: 'CASCADE' })

UserVerification.belongsTo(Users, { foreignKey: 'user_id' })
Users.hasOne(UserVerification, { foreignKey: 'user_id', onDelete: 'CASCADE' })

UserBusiness.belongsTo(Users, { foreignKey: 'user_id' })
Users.hasOne(UserBusiness, { foreignKey: 'user_id', onDelete: 'CASCADE' })

UserFiles.belongsTo(Users, { foreignKey: 'user_id' })
Users.hasMany(UserFiles, { foreignKey: 'user_id', onDelete: 'CASCADE' })

UserVoice.belongsTo(Users, { foreignKey: 'user_id' })
Users.hasOne(UserVoice, { foreignKey: 'user_id', onDelete: 'CASCADE' })

// exporting module
module.exports = { Users, Bot_creator, Integration, UserVerification, UserBusiness, UserFiles,UserVoice }
