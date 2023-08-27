// db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("karma-fund", "theuser", "thepassword", {
  host: "ec2-3-109-151-193.ap-south-1.compute.amazonaws.com",
  dialect: "mysql",
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000,
  },
});

module.exports = sequelize;
