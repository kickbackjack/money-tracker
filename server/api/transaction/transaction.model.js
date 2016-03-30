'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Transaction', {
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
  });
}
