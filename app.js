var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
var publicDir = path.join(__dirname,'/public');
//var upload=require("express-fileupload");




const swaggerDocument = require('./swagger.json');

var users = require('./routes/users');
var products = require("./routes/product");
var studentRecords = require("./routes/studentrecord");
var auths = require("./routes/authentications");
var chat = require("./routes/Chat");
var category = require("./routes/Category");
var brand = require("./routes/Brands");
var image = require("./routes/Image");
var dashboard = require("./routes/Dashboard");

var app = express();
var session = require('express-session');
app.use(session({ resave: true ,secret: 'admin' , saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(publicDir));
//app.use(upload());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
  next();
})

app.use('/api/v1/users', users);
app.use('/api/v1/product', products);
app.use('/api/v1/studentrecord', studentRecords);
app.use("/api/v1/auth", auths);
app.use("/api/v1/chat", chat);
app.use("/api/v1/category", category);
app.use("/api/v1/brand", brand);
app.use("/api/v1/image", image);
app.use("/api/v1/dashboard", dashboard);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*=======================Sockets Part=============================*/
var sockIO = require('socket.io')();
app.sockIO = sockIO;
sockIO.on('connection', socket =>{
    console.log('A user connected!');

    socket.on('chat message', receiver=>{
        sockIO.emit('chat message', receiver);
        console.log('api chat message-'+receiver);
    })

    socket.on('msg hist', sender=>{
      sockIO.emit('msg hist', sender);
      console.log("api msg hist-"+sender);
  })
})
/*=======================Sockets End=============================*/


////////////parvin
////admin
var pages=require("./routes/AdimGetPages");
app.use("/api/v1/admin/page", pages);
var config = require('./config');
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.set('views', path.join(__dirname, './vievs'));
app.set('view engine', 'ejs');

////user
var pages_user=require("./routes/GetPages");
app.use("/api/v1/page", pages_user);

/////////

app.use(function(req, res, next) {
	res.redirect('/api/v1/dashboard/')
});



module.exports = app;
