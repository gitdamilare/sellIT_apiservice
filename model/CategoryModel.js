var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');
var Brand = require('../model/BrandModel');

var Category = sequelize.define("category",{
    category_id : {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      allowNull : false,
      primaryKey : true
    },
    parent_id : {
      type: Sequelize.BIGINT(11)
    },
    name : {
      type: Sequelize.STRING(20),
      allowNull : false
    },
    description : {
        type: Sequelize.TEXT,
        allowNull : false
      },
    images : {
      type: Sequelize.TEXT,
      allowNull : true
    },
    created_date : {
      type: Sequelize.DATE,
      defaultValue : Date.now()
    },
    modified_date : {
      type: Sequelize.DATE,
      defaultValue : Date.now()
    },
  }
)
Category.hasMany(Category, {foreignKey: "parent_id", as : "sub_category"});
Category.hasMany(Brand, {foreignKey: "category_id", as : "brands"});
module.exports=Category;

