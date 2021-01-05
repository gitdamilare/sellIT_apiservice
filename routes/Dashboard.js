var express = require('express');
var router = express.Router();
var Dash = require("../controller/DashboardController");

router.get('/', function (req, res, next) {
  var totalProduct = 0;
  var totalSoldProduct = 0;
  var totalPendingProduct = 0;
  var totalApprovedProduct = 0;
  var totalInActiveProduct = 0;
  var totalDeletedProduct = 0;
  var totalProductAmount = 0;
  var totalSoldProductAmount = 0;
  var totalUser = 0;
  var topPendingProduct;
  var topSoldProduct;
  var totalMessage = 0;
  Dash.totalProduct((rows) => {
    if (!rows) {
      console.log(rows);
      res.json({
        "status": "failed",
        "cahat": null
      })
    } else {
      totalProduct = rows;
      Dash.totalSoldProduct((rows) => {
        totalSoldProduct = rows;
        Dash.totalPendingProduct((rows) => {
          totalPendingProduct = rows;
          Dash.totalApprovedProduct((rows) => {
            totalApprovedProduct = rows;
            Dash.totalInActiveProduct((rows) => {
              totalInActiveProduct = rows;
              Dash.totalDeletedProduct((rows) => {
                totalDeletedProduct = rows;
                Dash.totalProductAmount((rows) => {
                  totalProductAmount = !rows ? 0 : parseInt(rows);
                  Dash.totalSoldProductAmount((rows)=> {
                    totalSoldProductAmount = !rows ? 0 :  parseInt(rows);
                    Dash.totalUser((rows)=>{
                      totalUser = rows
                      Dash.getTopPendingProduct((rows)=>{
                        var topPendingProduct = rows
                        Dash.getTopSoldProduct((rows) => {
                          var topSoldProduct = rows
                          Dash.totalMessage((rows) => {
                          var totalMessage = rows
                          res.render("admin/login.ejs",{
                            "totalProduct": totalProduct,
                            "totalSoldProduct": totalSoldProduct,
                            "totalPendingProduct": totalPendingProduct,
                            "totalApprovedProduct": totalApprovedProduct,
                            "totalInActiveProduct": totalInActiveProduct,
                            "totalDeletedProduct": totalDeletedProduct,
                            "totalProductAmount": totalProductAmount.toLocaleString(),
                            "totalSoldProductAmount" : totalSoldProductAmount.toLocaleString(),
                            "totalUser" : totalUser,
                            "totalMessage" : totalMessage,
                            "topPendingProduct" : {"products" : topPendingProduct},
                            "topSoldProduct" : {"products" : topSoldProduct}
                          })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        });
      })


    }
  });

});


router.get('/api', function (req, res, next) {
  var totalProduct = 0;
  var totalSoldProduct = 0;
  var totalPendingProduct = 0;
  var totalApprovedProduct = 0;
  var totalInActiveProduct = 0;
  var totalDeletedProduct = 0;
  var totalProductAmount = 0;
  var totalSoldProductAmount = 0;
  var totalUser = 0;
  var topPendingProduct;
  var topSoldProduct;
  var totalMessage = 0;
  Dash.totalProduct((rows) => {
    if (!rows) {
      console.log(rows);
      res.json({
        "status": "failed",
        "cahat": null
      })
    } else {
      totalProduct = rows;
      Dash.totalSoldProduct((rows) => {
        totalSoldProduct = rows;
        Dash.totalPendingProduct((rows) => {
          totalPendingProduct = rows;
          Dash.totalApprovedProduct((rows) => {
            totalApprovedProduct = rows;
            Dash.totalInActiveProduct((rows) => {
              totalInActiveProduct = rows;
              Dash.totalDeletedProduct((rows) => {
                totalDeletedProduct = rows;
                Dash.totalProductAmount((rows) => {
                  totalProductAmount = !rows ? 0 : parseInt(rows);
                  Dash.totalSoldProductAmount((rows)=> {
                    totalSoldProductAmount = !rows ? 0 :  parseInt(rows);
                    Dash.totalUser((rows)=>{
                      totalUser = rows
                      Dash.getTopPendingProduct((rows)=>{
                        var topPendingProduct = rows
                        Dash.getTopSoldProduct((rows) => {
                          var topSoldProduct = rows
                          Dash.totalMessage((rows) => {
                          var totalMessage = rows
                          res.json({
                            "totalProduct": totalProduct,
                            "totalSoldProduct": totalSoldProduct,
                            "totalPendingProduct": totalPendingProduct,
                            "totalApprovedProduct": totalApprovedProduct,
                            "totalInActiveProduct": totalInActiveProduct,
                            "totalDeletedProduct": totalDeletedProduct,
                            "totalProductAmount": totalProductAmount.toLocaleString(),
                            "totalSoldProductAmount" : totalSoldProductAmount.toLocaleString(),
                            "totalUser" : totalUser,
                            "totalMessage" : totalMessage,
                            "topPendingProduct" : {"products" : topPendingProduct},
                            "topSoldProduct" : {"products" : topSoldProduct}
                          })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        });
      })


    }
  });

});

function getDashboardResult() {
  var totalProduct = Dash.totalProduct((rows) => { rows });
  console.log(totalProduct + "from getDashboardResult");
}


module.exports = router;
