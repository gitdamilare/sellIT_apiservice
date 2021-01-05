var express = require('express');
var router = express.Router();
var Chat = require("../controller/ChatController");

router.get('/:matrikel_number', function(req, res, next) {
  var matrikel_number =req.params.matrikel_number;
      Chat.getAllCommunications(matrikel_number, (rows) => {
          if (!rows) {
              res.json({
                  "status": "failed",
                  "cahat": null
              })
          } else {
        res.json({rows});
          }
      });
  });

  router.post('/getAllMessages', function(req, res, next) {
    console.log(req.body);
    var data = req.body;
    
  
    Chat.getAllMessages(data.receiver_id,data.sender_id, (rows) => {
          if (!rows || !rows.length) {
              res.json({
                  "status": "failed",
                  "message": null
              })
          } else {
              res.json({
                  rows
              })
          }
      })
  
  });

router.post('/sendMessage', function (req, res, next) {
  var data = req.body;
  var message = {
    message: data.message,
    product_id: data.product_id,
    sender_id: data.sender_id,
    receiver_id: data.receiver_id
    //created_date: data.created_date,
    //modified_date: data.modified_date
  }
  console.log(message);
  Chat.sendMessage(message, (rows) => {
    if (!rows) {
      res.json({
        "status": "failed",
        "message": null
      })
    } else {
      res.json({
        "status": "sucessfull"
      })
    }
  })

});

module.exports = router;
