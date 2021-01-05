var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');
const Op = Sequelize.Op;
var Product = require("../model/ProductModel");
var User = require("../model/UserModel");
var Chat = require("../model/ChatModel");
var Enum = require("../model/Enumeration");

var totalApprovedProduct = 0;
var totalInActiveProduct = 0;
var totalDeletedProduct = 0;

module.exports.totalProduct = function (callback) {
  Product.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('product_id')), 'totalProduct']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));

    callback(data[0].totalProduct)
  }).catch((err) => {
    callback(err);
  })
}

module.exports.totalSoldProduct = function (callback) {
  Product.findAll({
    where: {
      status: Enum.productStatus.Sold.value
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('product_id')), 'totalSoldProduct']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));

    callback(data[0].totalSoldProduct)
  }).catch((err) => {
    callback(err);
  })
}

module.exports.totalPendingProduct = function (callback) {
  Product.findAll({
    where: {
      status: Enum.productStatus.Under_Review.value
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('product_id')), 'totalPendingProduct']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));

    return callback(data[0].totalPendingProduct);
  }).catch((err) => {
    return callback(err);
  })

}

module.exports.totalApprovedProduct = function (callback) {
  Product.findAll({
    where: {
      status: Enum.productStatus.Approved.value
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('product_id')), 'totalApprovedProduct']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));

    return callback(data[0].totalApprovedProduct);
  }).catch((err) => {
    return callback(err);
  })

}

module.exports.totalInActiveProduct = function (callback) {
  Product.findAll({
    where: {
      status: Enum.productStatus.Inactive.value
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('product_id')), 'totalInActiveProduct']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));

    return callback(data[0].totalInActiveProduct);
  }).catch((err) => {
    return callback(err);
  })

}

module.exports.totalDeletedProduct = function (callback) {
  Product.findAll({
    where: {
      status: Enum.productStatus.Deleted.value
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('product_id')), 'totalDeletedProduct']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));

    return callback(data[0].totalDeletedProduct);
  }).catch((err) => {
    return callback(err);
  })

}

module.exports.totalProductAmount = function (callback) {
  Product.findAll({
    attributes: [[sequelize.fn('SUM', sequelize.col('price')), 'totalProductAmount']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));

    return callback(data[0].totalProductAmount);
  }).catch((err) => {
    return callback(err);
  })

}

module.exports.totalSoldProductAmount = function (callback) {
  Product.findAll({
    where: {
      status: Enum.productStatus.Sold.value
    },
    attributes: [[sequelize.fn('SUM', sequelize.col('price')), 'totalSoldProductAmount']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));
    return callback(data[0].totalSoldProductAmount);
  }).catch((err) => {
    return callback(err);
  })

}

module.exports.totalUser = function (callback) {
  User.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('matrikel_number')), 'totalUser']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));
    return callback(data[0].totalUser);
  }).catch((err) => {
    return callback(err);
  })
}

module.exports.getTopPendingProduct = function (callback) {
  Product.findAll({
    where:{
      status : Enum.productStatus.Under_Review.value
    },
    limit: 5,
    order : [
      ['created_date', 'DESC'],
    ]
  })
    .then(function (related) {
      callback(related);
    })
    .catch(function (err) {
      callback(err);
    });
}

module.exports.getTopSoldProduct = function (callback) {
  Product.findAll({
    where:{
      status : Enum.productStatus.Sold.value
    },
    limit: 5,
    order : [
      ['created_date', 'DESC'],
    ]
  })
    .then(function (related) {
      callback(related);
    })
    .catch(function (err) {
      callback(err);
    });
}

module.exports.totalMessage = function (callback) {
  Chat.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('chat_id')), 'totalChat']]
  }).then((data) => {
    var data = JSON.parse(JSON.stringify(data));
    return callback(data[0].totalChat);
  }).catch((err) => {
    return callback(err);
  })
}



