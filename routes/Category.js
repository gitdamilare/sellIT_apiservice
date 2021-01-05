var express = require('express');
var router = express.Router();
var Category = require("../controller/CategoryController");

router.get('/', function (req, res, next) {
    Category.getAllSubCategories((rows) => {
        if (!rows || !rows.length) {
            res.json({
                "status": "failed",
                "category": null
            })
        } else {
            res.json({ rows });
        }
    })
});

router.get('/categories', function (req, res, next) {
  Category.getAllCategories((rows) => {
      if (!rows || !rows.length) {
          res.json({
              "status": "failed",
              "category": null
          })
      } else {
          res.json({ rows });
      }
  })
});
router.get('/subcategories', function (req, res, next) {
  Category.getAllSubCategories((rows) => {
      if (!rows || !rows.length) {
          res.json({
              "status": "failed",
              "category": null
          })
      } else {
          res.json({ rows });
      }
  })
});

router.get('/categoriesandsub', function (req, res, next) {
  Category.getAllCategoryAndSub((rows) => {
      if (!rows || !rows.length) {
          res.json({
              "status": "failed",
              "category": null
          })
      } else {
          res.json({ rows });
      }
  })
});

router.get('/:id', function (req, res, next) {
  var category_id = req.params.id;
  Category.getAllCategoryBrands(category_id, (rows) => {
    if (!rows) {
      res.json({
        "status": "failed",
        "user": null
      })
    } else {
      res.json({ category: rows });
    }
  });
});


router.post("/", function(req,res, next){
  var name = req.body.name;
  var description = req.body.description;
  var parent_id = req.body.parent_id;
  var d = new Date();
  var date=""+d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
  Category.addCategory({
    name:name,
    description:description,
    parent_id:parent_id,
    created_date:date,
    modified_date:date
  }, (rows) => {
    if (!rows) {
      res.json({
        "status": "failed",
        "user": null
      })
    } else {
      res.json({ products: rows });
    }
  });
})

module.exports = router;
