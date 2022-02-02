'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name_prefix: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    date_of_birth: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};