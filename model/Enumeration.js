var Enum = require('enum');

module.exports.productStatus = new Enum({'Approved': 1,
                              'Sold': 2,
                              'Under_Review': 3,
                              "Inactive": 4,
                              "Deleted" : 5});


