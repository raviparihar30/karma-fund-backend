const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define("Post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: "LONGTEXT", // Set the type to LONGTEXT
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Post;
