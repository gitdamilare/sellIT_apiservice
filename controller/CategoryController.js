var Category = require('../model/CategoryModel');
var Brand = require('../model/BrandModel');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.getAllCategoryAndSub = function (callback) {
  Category.findAll({
    where: {
      parent_id: 0
    },
    include: { model: Category, as: "sub_category" }
  })
    .then(function (related) {
      //console.log(related[0].role.role);
      callback(related);
    })
    .catch(function (err) {
      //console.log(err);
      callback(err);
    });
}

module.exports.getAllCategoryBrands = function (category_id, callback) {
  Category.findAll({
    where: {
      category_id: category_id
    },
    include: { model: Brand, as: "brands" }
  })
    .then(function (related) {
      //console.log(related[0].role.role);
      callback(related);
    })
    .catch(function (err) {
      //console.log(err);
      callback(err);
    });
}

module.exports.getAllCategories = function (callback) {
  Category.findAll({
    where: {
      parent_id: 0
    }
  })
    .then(function (related) {
      //console.log(related[0].role.role);
      callback(related);
    })
    .catch(function (err) {
      //console.log(err);
      callback(err);
    });
}

module.exports.getAllSubCategories = function (callback) {
  Category.findAll({
    where: {
      parent_id: {
        [Op.not]: 0
      }
    }
  })
    .then(function (related) {
      //console.log(related[0].role.role);
      callback(related);
    })
    .catch(function (err) {
      //console.log(err);
      callback(err);
    });
}


module.exports.addCategory = function (category, callback) {
  Category.build(category).save().then((data) => {
    console.log(data.dataValues);
    callback(data.dataValues);
  }).catch((err) => {
    callback(err);
  })
}
