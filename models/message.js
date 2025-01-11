const { DataTypes } = require("sequelize");
const User = require("./user");

module.exports = (sequelize) => {
  const Message = sequelize.define("Message", {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
  }, { timestamps: true });

  Message.belongsTo(User, { as: "author", foreignKey: "authorId" });
  User.hasMany(Message, { foreignKey: "authorId" });

 return Message;
};
