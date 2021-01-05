/*user model*/
var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var Product = sequelize.define('products', {
	product_id: {
		type: Sequelize.BIGINT(5),
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	product_name: {
		type: Sequelize.STRING(1000),
		allowNull: false
	},
	// slug: {
	// 	type: Sequelize.STRING(25)
	// },
	description: {
		type: Sequelize.TEXT(1000)
	},
	price: {
		type: Sequelize.BIGINT(11),
		allowNull: false
	},
	// img_id: {
	// 	type: Sequelize.BIGINT(11)
	// },
	image: {
		type: Sequelize.STRING(1000)
	},
	// seller_id: {
	// 	type: Sequelize.BIGINT(11)
	// }
	// ,
	// more_details: {
	// 	type: Sequelize.STRING(145)
	// },
	// status: {
	// 	type: Sequelize.BIGINT(1)
	// }
	// ,
	// category_id: {
	// 	type: Sequelize.BIGINT(11)
	// },
	// condition: {
	// 	type: Sequelize.BIGINT(11)
	// },
	// create_date: {
	// 	type: Sequelize.DATE
	// },
	// modified_date: {
	// 	type: Sequelize.DATE
	// }
	year: {
		type: Sequelize.STRING(20)
	}

});

module.exports.getAllProducts = function(callback) {
        Product.findAll()
		.then(function(related) {
			//console.log(related[0].role.role);
			callback( related);
		  })
		  .catch(function(err) {
			//console.log(err);
			callback(err);
		  });
	}

module.exports.getAllProductsByName = function(product_name,callback) {
        Product.findAll({
			where: {
        product_name:product_name
				 	}
		  })
		.then(function(related) {
			//console.log(related[0].role.role);
			callback( related);
		  })
		  .catch(function(err) {
			//console.log(err);
			callback(err);
		  });
  }

module.exports.searchProductsByName = function(product_name,callback){
    Product.sequelize.query( "SELECT * FROM products WHERE CONCAT(product_name) LIKE \"%" + product_name + "%\"",
    {type: Product.sequelize.QueryTypes.SELECT}
    ).then(function(related){
      callback(related);
    }).catch(function(err){
      callback(err);
      console.log(err);
    });
  }
