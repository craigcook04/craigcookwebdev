var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true})); // Need this to retrieve body information when retrieving POST requests, and when creating named inputs
app.use(express.static('public')); // accessing local folders

app.set('view engine', 'ejs'); // Presets the file suffix as .esj

var friends = ['Tony', 'Charlie', 'Scott'];

app.post("/addfriend", function(req, res) {
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect('/friends');
    
});

// "/" => "Hi There!!"
app.get('/:faveAnimal', function(req, res) { // "/" specifies the route to be traced into.. request and response are objects
    var animal = req.params.faveAnimal;
    res.render('home', {thingVar: animal}); // .render() takes information from the HTTP request and does something with it in our ejs (embedded js) file
});

app.get('/test/posts', function(req, res) {
   var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Post 2", author: "Charlie"},
        {title: "Post 3", author: "Ben"}
    ]; 
    
    res.render('posts', {posts: posts}); // this second 'posts' is the one that is referring to the one that defined the array, first one always points back to the other file
})

// "/bye" => "Goodbye"
app.get('/bye', function(req, res) {
    res.send("Goodbye!!");
});

// "/dog" => "WOOF!!"
app.get('/dog', function(req, res) {
    res.send("WOOF!!");
});

app.get("/r/:subredditName", function(req, res) { // ":" is the variable parameter
   var subreddit = req.params.subredditName;
   res.send('You are on the subreddit called: ' + subreddit);
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res) { // ":" is the variable parameter, and will check the matched pattern of file names divided by "/"'s
    var subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!!");
    
    console.log(req.params);
    res.send("WELCOME TO THE COMMENTS PAGE!!");
});

app.get("*", function(req, res) { // "*" encompasses all and will catch everything that passes through it first; therefore we need to handle the "*" request until after we have already defined all other routes
   console.log("You are not on a predefined route on this website"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
}); // coming from cloud9, this is mandatory

