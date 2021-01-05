/*user model*/
var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');
const Op = Sequelize.Op;
var Image = require("./ImageModel");
var User = require("./UserModel");


var Product = sequelize.define('products', {
  product_id: {
    type: Sequelize.BIGINT(5),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  //  img_id: {
  //  	type: Sequelize.BIGINT(11)
  //  },
  // image: {
  // 	type: Sequelize.STRING(1000)
  // },
  seller_id: {
    type: Sequelize.BIGINT(11),
    allowNull: false
  }
  ,
  more_details: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.BIGINT(11),
    allowNull: false
  }
  ,
  category_id: {
    type: Sequelize.BIGINT(11),
    allowNull: false
  },
  brand_id: {
    type: Sequelize.BIGINT(11),
    allowNull: false
  },
  product_condition: {
    type: Sequelize.BIGINT(11)
  },
  created_date: {
    type: Sequelize.DATE
  },
  modified_date: {
    type: Sequelize.DATE
  },
});


Product.hasMany(Image, {foreignKey: "product_id", as : "image"});

/*Product.associate = function(models) {
  Product.belongsTo(User, {foreignKey: 'seller_id', as: 'company'})
};*/
Product.belongsTo(User, {foreignKey: "seller_id", as : "seller_info"});
module.exports = Product;

