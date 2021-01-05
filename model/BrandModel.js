var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var Brand = sequelize.define("brands",{
    brand_id : {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      allowNull : false,
      primaryKey : true
    },
    category_id : {
      type: Sequelize.BIGINT(11)
    },
    brand_name : {
      type: Sequelize.STRING(20),
      allowNull : false,
    },
    created_date : {
      type: Sequelize.DATE,
      allowNull : false,
    },
    modified_date : {
      type: Sequelize.DATE,
      allowNull : false,
    },
  }
)
module.exports=Brand;

