var express = require('express');
var router = express.Router();


router.get('/messages', function (req, res, next) {
    console.log("MMMMMMMMMMMMMMMMMMMMMMEEEEEEEEEEEEEEEESSSSSSSSSSSSSSAAAAAAAAAAAAAAGGGGGGGGGEEEEEEEEEEEEE")
    res.render('user/messages.ejs');
});

// router.get('/login', function (req, res, next) {
//     res.render('login.ejs');
// });

// router.get('/search', function (req, res, next) {
//     res.render('search.ejs');
// });



module.exports = router;