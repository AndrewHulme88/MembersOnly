const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const User = require("./user");

const Message = sequelize.define("Message", {
  title: DataTypes.STRING,
  text: DataTypes.TEXT,
}, { timestamps: true });

Message.belongsTo(User, { as: "author" });
User.hasMany(Message, { foreignKey: "authorId" });

module.exports = Message;
