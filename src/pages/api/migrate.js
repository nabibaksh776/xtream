const sequelize = require("../../backend/db/db"); // Adjust path if necessary

const { Users } = require("../../backend/associations/UsersRelations");

const Migrate = async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    res.status(200).json({ message: "Database & tables created!" });
  } catch (error) {
    console.log("this is error--", error);
    res.status(500).json({ error: "Failed to sync database" });
  }
};

export default Migrate;
