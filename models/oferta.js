'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oferta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  oferta.init({
    monto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'oferta',
    tableName: 'oferta',
    timestamps: false
  });
  return oferta;
};