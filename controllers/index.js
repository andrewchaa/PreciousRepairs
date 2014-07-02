(function (controllers) {

    var homeController = require("./homeController");
    var authController = require("./authController");

    controllers.init = function (app) {
        homeController.init(app);
        authController.init(app);
    };

})(module.exports)