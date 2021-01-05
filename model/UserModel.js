var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');


var User = sequelize.define("users",{
    matrikel_number : {
      type: Sequelize.BIGINT(11),
      allowNull : false,
      primaryKey : true
    },
    first_name : {
      type: Sequelize.STRING(25),
      allowNull : false,
    },
    last_name : {
      type: Sequelize.STRING(25),
      allowNull : false,
    },
    dob : {
      type: Sequelize.DATE,
      allowNull : false,
    },
    email : {
      type: Sequelize.STRING(30),
      allowNull : false,
    },
    address : {
      type: Sequelize.STRING(45),
      allowNull : false,
    },
    phone_number : {
      type: Sequelize.STRING(25),
      allowNull : false,
    },
    postal_code : {
      type: Sequelize.STRING(10),
      allowNull : false,
    },
    role_id : {
      type : Sequelize.BIGINT(11),
      allowNull : false,
    },
    username : {
      type: Sequelize.STRING(15),
      allowNull : false,
    },
    created_date : {
      type: Sequelize.DATE,
    },
    modified_date : {
      type: Sequelize.DATE,
    },
  }
)

module.exports=User;
