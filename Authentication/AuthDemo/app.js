var express                 = require('express'), 
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    bodyParser              = require('body-parser'),
    User                    = require('./models/user'),
    LocalStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/auth_demo_app');



var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: "Amber is the best pup",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

///////////////////////
//////  ROUTES   //////
///////////////////////

app.get('/', function(req, res) {
   res.render('home'); 
});

app.get('/secret', isLoggedIn, function(req, res) {
   res.render('secret'); 
});

///////////////////////
////  AUTH ROUTES  ////
///////////////////////

app.get('/register', function(req, res) {
   res.render('register');
});

// handle user signup
app.post('/register', function(req, res) {
   req.body.username
   req.body.password
   User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
       if(err) {
           console.log(err);
           res.render('register');
       }
       passport.authenticate('local')(req, res, function() { // we say we want to use the local strategy
            res.redirect('/secret');
       });
   }); 
});

// login routes

//render login form
app.get('/login', function(req, res) {
   res.render('login'); 
});

// login logic
app.post('/login', passport.authenticate('local', { // passport.authenticate() here is a middleware and is code that is run immediately before the callback
    successRedirect: '/secret',
    failureRedirect: '/login'
}) , function(req, res) {
    
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) { // next() calls the next middleware in line to be called
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

//////////////////////
/////  SERVER    /////
//////////////////////

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server is Running..');
});