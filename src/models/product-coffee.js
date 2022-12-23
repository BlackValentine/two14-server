'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCoffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductCoffee.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    roast: DataTypes.STRING,
    origin: DataTypes.STRING,
    taste: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.BLOB,
  }, {
    sequelize,
    modelName: 'ProductCoffee',
  });
  return ProductCoffee;
};