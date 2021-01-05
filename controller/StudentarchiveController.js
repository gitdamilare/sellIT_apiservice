
var StudentRecords = require('../model/StudentarchiveModel');

module.exports.getStudentRecordByID = function (id, callback) {
    StudentRecords.findByPk(id).then(function (realted) {
      callback(realted);
    }).catch(function (err) {
      callback(err);
    })
  }
  
  module.exports.getAllStudentArchive = function (callback) {
    StudentRecords.findAll()
      .then(function (realted) {
        callback(realted);
      }
      ).catch(function (err) {
        callback(err);
      });
  }
  