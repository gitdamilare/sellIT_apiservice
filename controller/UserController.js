User = require("../model/UserModel");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.createUser  = function(user, callback){
    User.create(user).then(function(related){
      callback(related);
      //console.log("related => " +  related);
    }).catch(function(err){
      var err = {
        "isError" : true,
        "error" : err.original.sqlMessage
      }
      callback(err);
      //console.log("err => " +  err);
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
        //password:password
      }
    }).then(function(result){
      callback(result);
    }).catch(function(err){
      callback(err);
      console.log(err);
    });

  }
