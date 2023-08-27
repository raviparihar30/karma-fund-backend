const { Sequelize } = require("sequelize");

// Replace these values with your MySQL database configuration
const sequelize = new Sequelize("karma-fund", "theuser", "thepassword", {
  host: "ec2-3-109-151-193.ap-south-1.compute.amazonaws.com",
  dialect: "mysql",
  connectTimeout: 60000,
});

async function testDatabaseConnection() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

// Call the function to test the database connection
testDatabaseConnection();
