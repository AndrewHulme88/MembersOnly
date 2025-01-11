const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const User = require("./user")(sequelize);
const Message = require("./message")(sequelize);

User.hasMany(Message, { foreignKey: "authorId" });
Message.belongsTo(User, { as: "author", foreignKey: "authorId" });

module.exports = { sequelize, User, Message };
