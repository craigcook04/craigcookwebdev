/////////////////////////////
////////   SETUP   //////////
/////////////////////////////


// NPM PACKAGE SETUP
var expressSanitizer    = require('express-sanitizer'),
methodOverride          = require('method-override'),
bodyParser              = require('body-parser'),
mongoose                = require('mongoose'),
express                 = require('express'),
app                     = express();


//APP CONFIG

mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));


//MONGOOSE / MODEL CONFIG

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {
            type: Date, 
            default: Date.now
            
        }
});

var Blog = mongoose.model("Blog", blogSchema);



////////////////////////////////
///////  RESTFUL ROUTES  ///////
////////////////////////////////

// ROOT route - redirect from here
app.get('/', function(req, res) {
   res.redirect('/blogs'); 
});


// INDEX route - list all database items -- mongoose method:   Blog.find()
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) { // 'blogs' can be any arbitrary variable name
        if(err) {
            console.log("ERROR!!");
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});


// NEW route - show new database item form -- NO mongoose method
app.get('/blogs/new', function(req, res) {
    res.render('new');
});


// CREATE route - create new database item, then redirect somewhere - sanitize -- mongoose method: Blog.create()
app.post('/blogs', function(req, res) {
   //create blog
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog) {
       if(err) {
           console.log('ERROR!');
       } else {
           res.redirect('/blogs');
       }
   });
});


// SHOW route - show info about one specific database item -- mongoose method: Blog.findById()
app.get('/blogs/:id', function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog) {
       if(err) {
           res.redirect('/blogs');
       } else {
           res.render('show', {blog: foundBlog});
       }
   }); 
});


// EDIT route - show edit form for one specific database item -- mongoose method: Blog.findById()
app.get('/blogs/:id/:edit', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
           res.redirect('/blogs');
       } else {
           res.render('edit', {blog: foundBlog});
       }
   });
});


// UPDATE route - update an item, then redirect somewhere -sanitize -- mongoose method: Blog.findByIdAndUpdate()
app.put('/blogs/:id', function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) { // .findByIdAndUpdate(id, newData, callbackFunction(){});
       if(err) {
           res.redirect('/blogs');
       } else {
           res.redirect('/blogs/' + req.params.id);
       }
   });
});


// DESTROY route - delete a specific database item, then redirect somewhere -- mongoose method: Blog.findByIdAndRemove()
app.delete('/blogs/:id', function(req, res) {
   // destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           console.log('ERROR when deleting');
           res.redirect('/blogs');
       } else {
           res.redirect('/blogs');
       }
   });
   
});


///////////////////////////////
//////   SERVER SETUP   ///////
///////////////////////////////

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server is running on port: ', process.env.PORT);
});




