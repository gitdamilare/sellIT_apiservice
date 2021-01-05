var Image = require("../model/ImageModel");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.createImage  = function(image, callback){
  Image.create(image).then(function(related){
      callback(related);
      console.log(related);
    }).catch(function(err){
      callback(err);
      console.log(err);
    })
  }

