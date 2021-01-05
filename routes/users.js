var express = require('express');
var router = express.Router();
var Users = require("../controller/UserController");
var utili = require("../utility/utility");
var Product = require("../controller/ProductController");
const Cryptr = require('cryptr');
const cryptr = require("../utility/cryptrkey");

/* GET users listing. */
router.get('/', function(req, res, next) {
    Users.getAllUser((result) => {
      if(utili.isEmpty(result)){
        res.json({
          status : "No Record Found",
          user : null
        });
      }else{
        res.json({users : result});
      }

    })
});

router.post("/", function(req,res,next){
  const data = req.body;
  console.log(data);
  const encryptedString = cryptr.cryptr.encrypt(data.password);
  console.log(encryptedString);
  Users.createUser(
        {
        matrikel_number : data.matrikel_number,
        first_name : data.first_name,
        last_name : data.last_name,
        dob : data.dob,
        email : data.email,
        address : data.address,
        phone_number : data.phone_number,
        role_id : data.role_id,
        username : data.username,
        password : encryptedString,
        postal_code : data.postal_code,
        created_date : data.created_date,
        modified_date : data.modified_date
  }, (result) => {
    if(result.isError){
      return res.json({
        status : "failed",
        reason : result,
      })
    }else{
     return res.json({
      status : "success",
    })
    }
  })
})



module.exports = router;


