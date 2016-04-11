'use strict';

export default function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    datecreated: DataTypes.NOW,
    datetransaction: DataTypes.DATE,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cleared: DataTypes.BOOLEAN,
    income: DataTypes.DOUBLE,
    outcome: DataTypes.DOUBLE,
    externalpayee: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.Category, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: true
          }
        });
        // Transaction.hasOne(models.Category, {
        //   as: 'Category'
        // });
      }
    }
  });

  return Transaction;
}
