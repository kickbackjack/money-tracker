'use strict';

export default function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.SubCategory, {as: 'SubCategory'});
      }
    }
  });

  return Category;
}
