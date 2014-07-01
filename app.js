var express = require("express");
var controllers = require("./controllers");

var app = express();
app.set("view engine", "vash");
app.use(express.static(__dirname + "/public"));

controllers.init(app);

var server = app.listen("3000", function () {
    console.log("listening to port %d", server.address().port);
})