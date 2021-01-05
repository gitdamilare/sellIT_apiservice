var Product = require('../model/ProductModel');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var Image = require("../model/ImageModel");
var Enum = require("../model/Enumeration");
var User = require("../model/UserModel");


//TODO : Add Status = 1 to the Where Clause
module.exports.getAllProducts = function (callback) {
  Product.findAll({
    where:{
      status : Enum.productStatus.Approved.value
    },
    include: {
      model: Image,
      as: "image",
    }
  })
    .then(function (related) {
      callback(related);
    })
    .catch(function (err) {
      callback(err);
    });
}

module.exports.getAllProductsByName = function (product_name, callback) {
  Product.findAll({
    where: {
      [Op.or]:  [{name: {
        [Op.substring]: product_name
      }}, {slug: {
        [Op.substring]: product_name
      }}],
      /*name: {
        [Op.substring]: product_name
      },*/
      status: Enum.productStatus.Approved.value
    },
    include: [{
      model: Image,
      as: "image",
      //where: { primary_image_id: '0' }
    },
    {
      model: User,
      as: "seller_info"
    }
  ]
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

module.exports.getProductById = function (product_id, callback) {
  Product.findAll({
    where: {
      product_id: product_id,
      // status: Enum.productStatus.Approved.value
    },
    include: [ {
      model: Image,
      as: "image"
    },
    {
      model: User,
      as: "seller_info"
    }
  ],
  })
    .then(function (related) {
      callback(related);
    })
    .catch(function (err) {
      callback(err);
    });
}

module.exports.addProduct = function (product, callback) {
  Product.build(product).save().then((data) => {
    console.log(data.dataValues);
    callback(data.dataValues);
  }).catch((err) => {
    callback(err);
  })
}

module.exports.getAllUserProduct = function (user_id, callback) {
  Product.findAll({
    where: {
      seller_id: user_id
    },
    include: {
      model: Image,
      as: "image"
    },
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

module.exports.getMostRecentUserProduct = function (user_id, callback) {
  Product.findAll({
    where: {
      seller_id: user_id
    },
    include: {
      model: Image,
      as: "image"
    },
    limit: 1,
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

module.exports.updateProductStatus = function (product_id,status,callback) {
  Product.update({
    status: status
  },{
    where: {
      product_id: product_id
    }
  })
    .then(function (related) {
      callback(related);
    })
    .catch(function (err) {
      callback(err);
    });
}

module.exports.getAllProductsByStatus = function (status, callback) {
  Product.findAll({
    where: {
      status: status
    },
    include: {
      model: Image,
      as: "image",
      //where: { primary_image_id: '0' }
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

module.exports.getAllProductsByCategory = function (category_id, callback) {
  Product.findAll({
    where: {
      category_id: category_id
    },
    include: {
      model: Image,
      as: "image",
    }
  })
    .then(function (related) {
      callback(related);
    })
    .catch(function (err) {
      callback(err);
    });
}

module.exports.getAllPoductsWithLimit = function(startIndex,limit, callback){
  Product.findAll({
    offset: startIndex,
    limit: limit,
    where:{
      status : Enum.productStatus.Approved.value
    },
    include: [ {
      model: Image,
      as: "image"
    },
    {
      model: User,
      as: "seller_info"
    }
  ],
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
