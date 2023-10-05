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
      this.belongsTo(models.producto, {
        foreignKey: 'id_producto',
        as: 'producto',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario',
        onDelete: 'CASCADE'
      });
    }
  }
  oferta.init({
    monto: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    id_producto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'oferta',
    tableName: 'oferta',
    timestamps: false
  });
  return oferta;
};