'use strict';

export default function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'An account with that name already exists.'
      }
    },
    description: DataTypes.STRING,
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Account.hasMany(models.Transaction, {as: 'Transactions'});
      }
    }
  });

  return Account;
}
