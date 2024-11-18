const { DataTypes } = require('sequelize')
const sequelize = require('../../db/db')
// Define the model with other columns
const Embedding = sequelize.define(
  'Embedding',
  {
    domain: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    embedding: {
      type: 'VECTOR(1536)', // Using a custom type
      allowNull: true
    }
  },
  {
    timestamps: true,
    tableName: 'Embeddings'
  }
)
module.exports = Embedding
