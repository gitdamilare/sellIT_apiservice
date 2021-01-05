var express = require("express");
var fs = require('fs');

module.exports.isEmpty =  function(obj){
  for( var prop in obj){
    if(obj.hasOwnProperty(prop)){
      return false;
    }
  }
  return true;
}


module.exports.toBase64 = function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

