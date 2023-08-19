const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePhoto: {
    type: DataTypes.STRING, // You can change this data type if storing a URL
    allowNull: true, // Allow null to represent users without a photo
  },
  twitterLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedinLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
    allowNull: false,
  },
});

module.exports = User;
