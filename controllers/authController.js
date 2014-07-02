(function (authController) {

    var passport = require("passport");
    var FacebookStrategy = require("passport-facebook").Strategy;
    var FACEBOOK_APP_ID = process.env.facebook_app_id || '229826147226882';
    var FACEBOOK_APP_SECRET = process.env.facebook_app_secret || 'bcecf07add686af8e48ca4f2805f10b8';
    var CALLBACK_URL = process.env.facebook_callback_url || "http://preciousrepairs.local:3000/auth/facebook/callback";

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy(
        {
            clientID : FACEBOOK_APP_ID,
            clientSecret : FACEBOOK_APP_SECRET,
            callbackURL : CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                return done(null, profile);
            });
        }
    ));

    authController.init = function (app) {

        app.use(passport.initialize());
        app.use(passport.session());

        app.get("/dashboard", ensureAuthenticated, function (req, res) {
            console.log(req.user);
            res.render("dashboard", { user : req.user })
        })

        app.get("/auth/facebook", passport.authenticate('facebook'), function (req, res) {});
        
        app.get("/auth/facebook/callback", 
            passport.authenticate('facebook', { failureRedirect : '/login' } ),
            function (req, res) {
                if (req.session.return_uri) {
                    res.redirect(req.session.return_uri);
                    req.session.return_uri = '';
                } else {
                    res.redirect('/');
                }
                
            }
        )

        app.get("/login", function (req, res) {
            res.render("login", {})
        })

        app.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });


        function ensureAuthenticated(req, res, next) {
            if (req.isAuthenticated()) { 
                return next(); 
            }
            
            req.session.return_uri = req.path;
            res.redirect("/login");
        }

    }

})(module.exports)