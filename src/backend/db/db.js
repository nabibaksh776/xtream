import pg from "pg";

const { Sequelize } = require("sequelize");

console.log("DB Name:", process.env.NEXT_PUBLIC_DB_NAME);
console.log("DB User:", process.env.NEXT_PUBLIC_USERNAME);
console.log("DB Password:", process.env.NEXT_PUBLIC_PASSWORD);
console.log("DB Host:", process.env.NEXT_PUBLIC_HOST);
console.log("DB Port:", process.env.NEXT_PUBLIC_PORT);

// Create a new Sequelize instance is here
const sequelize = new Sequelize(
  process.env.NEXT_PUBLIC_DB_NAME,
  process.env.NEXT_PUBLIC_USERNAME,
  process.env.NEXT_PUBLIC_PASSWORD,
  {
    host: process.env.NEXT_PUBLIC_HOST, // The hostname of the database you are connecting to
    dialect: "postgres", // The dialect you are using
    dialectModule: pg,
    port: process.env.NEXT_PUBLIC_PORT, // The port your PostgreSQL server is running on
    logging: false, // Disable logging, or set to true to enable
    pool: {
      max: 5, // Maximum number of connections in pool
      min: 0, // Minimum number of connections in pool
      acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
      idle: 10000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
    },
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
