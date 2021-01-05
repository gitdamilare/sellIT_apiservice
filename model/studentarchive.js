var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var StudentRecords = sequelize.define("student_archives",{
    id:{
      type: Sequelize.CHAR(30),
      allowNull: false
    },
    matrikel_number : {
      type: Sequelize.BIGINT(11),
      allowNull : false,
      primaryKey : true,
      unique : true
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

module.exports.getStudentRecordByID  = function(id, callback){
  StudentRecords.findByPk(id).then(function(realted){
    callback(realted);
  }).catch(function(err){
    callback(err);
  })
}
