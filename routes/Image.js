var express = require('express');
var router = express.Router();
var Image = require("../controller/ImageController");

router.post('/', function (req, res, next) {
  var data = req.body;
  Image.createImage({
    image: data.image,
    url: data.url,
    primary_image_id: data.primary_image_id,
    video : data.video,
    product_id: data.product_id,
  }, (rows) => {
    if (!rows) {
      res.json({
        "status": "failed",
        "user": null
      })
    } else {
      res.json({
        "status": "sucessfull"
      })
    }
  })
});

module.exports = router;
