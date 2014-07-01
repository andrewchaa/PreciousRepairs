module.exports = function (grunt) {
    grunt.initConfig({
        nodemon : {
            all : {
                script : "app.js",
                options : {
                    watchedExtension : ["js"]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-nodemon");
    grunt.registerTask("default", ["nodemon"]);
}