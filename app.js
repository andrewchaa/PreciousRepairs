var express = require("express");
var controllers = require("./controllers");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');

var app = express();
app.set("view engine", "vash");

app.use(express.static(__dirname + "/public"));
app.use(morgan());
app.use(cookieParser('cookieMonster'));
app.use(bodyParser());
app.use(methodOverride());
app.use(session( { secret: "keyboard cat" }));

controllers.init(app);

var port = process.env.port || 3000;
var server = app.listen(port, function () {
    console.log("listening to port %d", server.address().port);
})