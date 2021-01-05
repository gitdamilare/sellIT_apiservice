var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');
const Op = Sequelize.Op;

var User = sequelize.define("users",{
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
    role_id : {
      type : Sequelize.BIGINT(11),
      allowNull : false,
    },
    username : {
      type: Sequelize.STRING(15),
      allowNull : false,
    },
    password : {
      type: Sequelize.STRING(15),
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

module.exports.createUser  = function(user, callback){
  User.create(user).then(function(related){
    callback(related);
    //console.log(related);
  }).catch(function(err){
    callback(err);
    //console.log(err);
  })
}

module.exports.getAllUser = function(callback){
  User.findAll().then(function(result){
    callback(result);
  }).catch(function(err){
    callback(err);
  });

}

module.exports.getUser = function(loginKey,password,callback){
  console.log(loginKey + " " +  password);
  User.findAll({
    where: {
      [Op.or]:  [{username: loginKey}, {matrikel_number: loginKey}],
      password:password
    }
  }).then(function(result){
    callback(result);
  }).catch(function(err){
    callback(err);
    console.log(err);
  });

}
