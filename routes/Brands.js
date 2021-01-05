var express = require('express');
var router = express.Router();
var Brand = require("../controller/BrandController");

router.get('/', function (req, res, next) {
    Brand.getAllBrands((rows) => {
        if (!rows || !rows.length) {
            res.json({
                "status": "failed",
                "brand": null
            })
        } else {
            res.json({"brands": rows });
        }
    })
});

module.exports = router;
