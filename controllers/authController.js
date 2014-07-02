(function (authController) {

    var passport = require("passport");
    var FacebookStrategy = require("passport-facebook").Strategy;
    var FACEBOOK_APP_ID = '229739257235571';
    var FACEBOOK_APP_SECRET = '7b36c85dd76ea320c94771ec32fbd74a';

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    var callbackURL = process.env.facebook_callback_url || "http://preciousrepairs.local:3000/auth/facebook/callback";
    passport.use(new FacebookStrategy(
        {
            clientID : FACEBOOK_APP_ID,
            clientSecret : FACEBOOK_APP_SECRET,
            callbackURL : callbackURL
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