'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.oferta, {
        foreignKey: 'id_producto',
        as: 'ofertas'
      });
    }
  }
  producto.init({
    nombre: DataTypes.STRING,
    precio_minimo: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    fecha_termino: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'producto',
    tableName: 'producto',
    timestamps: false
  });
  return producto;
};