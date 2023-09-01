module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });
  return User;
};
