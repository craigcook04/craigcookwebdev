var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require('./models/post'); // ./ references the current directory
var User = require('./models/user');

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belchair"
// });

// Post.create({
//     title: "How to cook the best burger",
//     content: "Have the last name Cook"
// }, function(err, post) {
//     console.log(post);
// });

Post.create({
    title: "How to cook the best burger PART 4",
    content: "Have the last name Cook"
}, function(err, post) {
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            foundUser.posts.push(post._id);
            foundUser.save(function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
                
            });
        }
    });
});

// Find User
// Find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate('posts').exec(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });






