var express = require('express');
var router = express.Router();
var Users = require("../controller/UserController");
var jwt = require('jsonwebtoken');
const cryptr = require("../utility/cryptrkey");


router.post('/', function(req, res, next) {
  console.log(req.body);
  var data = req.body;
  var loginKey = data.matrikel_number;
  var password= data.password;
  var token = jwt.sign({ loginKey:loginKey,password:password }, "GDSD");
	Users.getUser(loginKey,password, (rows) => {
		if (!rows || !rows.length) {
			res.json({
				"status": "failed",
				"user": null
			})
		} else {
     var data = JSON.parse(JSON.stringify(rows));
     console.log(data[0]);
     var encrptedPassword = data[0].password;
     var decryptyPassword = cryptr.cryptr.decrypt(encrptedPassword)
     if(decryptyPassword == password){
       if(data[0].role_id == 1){
        res.json({
          "status": "This is an Admin Login. Please go to the admin page",
          "user_id": data[0].matrikel_number
        })
       }else{
        res.json({
          token,
          "status": "sucessfull",
          "user_id": data[0].matrikel_number,
          "username": data[0].username,
          "user_info" : data[0]
        })
       }
     }else{
      res.json({
        "status": "Username or Password does not match",
        "user_id": data[0].matrikel_number
			})
     }

		}
	})

});


router.post('/admin', function(req, res, next) {
  var sessionStorage = require('sessionstorage');
  console.log(req.body);
  var data = req.body;
  var loginKey = data.matrikel_number;
  var password= data.password;

	Users.getUser(loginKey,password, (rows) => {
		if (!rows || !rows.length) {
			res.json({
        "status": "failed",
        "user_id": null
      })
		} else {
     var data = JSON.parse(JSON.stringify(rows));
     if(data[0].role_id==1){
      sessionStorage.setItem("matrik_num","sucessfull");
      console.log(sessionStorage.getItem("matrik_num"));
      // req.session.matrik_num = data[0].matrikel_number;
			res.json({
        "status": "sucessfull",
        "user_name": data[0].first_name+" "+data[0].last_name
      })}
      else
      res.json({
        "status": "failed",
        "user_id": null
      })
		}
	})

});

module.exports = router;
