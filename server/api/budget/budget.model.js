'use strict';

export default function(sequelize, DataTypes) {
  var Budget = sequelize.define('Budget', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Budget.hasMany(models.Category, {as: 'Categories'});
      }
    }
  });

  return Budget;
}
