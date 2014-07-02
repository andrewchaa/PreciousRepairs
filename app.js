var express = require("express");
var controllers = require("./controllers");
// var passport = require("passport");
// var FacebookStrategy = require("passport-facebook").Strategy;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');

// var FACEBOOK_APP_ID = '229739257235571';
// var FACEBOOK_APP_SECRET = '7b36c85dd76ea320c94771ec32fbd74a';

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//     done(null, obj);
// });

// passport.use(new FacebookStrategy(
//     {
//         clientID : FACEBOOK_APP_ID,
//         clientSecret : FACEBOOK_APP_SECRET,
//         callbackURL : "http://localhost:3000/auth/facebook/callback"
//     },
//     function (accessToken, refreshToken, profile, done) {
//         process.nextTick(function () {
//             return done(null, profile);
//         });
//     }
// ));

var app = express();
app.set("view engine", "vash");

app.use(express.static(__dirname + "/public"));
app.use(morgan());
app.use(cookieParser('cookieMonster'));
app.use(bodyParser());
app.use(methodOverride());
app.use(session( { secret: "keyboard cat" }));

// app.use(passport.initialize());
// app.use(passport.session());

controllers.init(app);

var port = process.env.port || 3000;
var server = app.listen(port, function () {
    console.log("listening to port %d", server.address().port);
})