var Brand = require('../model/BrandModel');

module.exports.getAllBrands = function (callback) {
	Brand.findAll()
	  .then(function (related) {
		callback(related);
	  })
	  .catch(function (err) {
		callback(err);
	  });
  }
