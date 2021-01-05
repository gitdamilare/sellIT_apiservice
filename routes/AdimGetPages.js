var express = require('express');
var router = express.Router();

router.post('/main', function (req, res, next) {
    res.render('admin/index.ejs');
});

router.post('/login', function (req, res, next) {
    res.render('admin/login.ejs');
});

module.exports = router;