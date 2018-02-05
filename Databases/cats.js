var mongoose = require('mongoose'); // mongoose is an ODB (object data mapper)

mongoose.connect('mongodb://localhost/cat_app');

// add a new cat to the DB

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model('Cat', catSchema); // use Cat.methods() as an object with mongoose model pieces 

var george = new Cat({
    name: "George",
    age: 11,
    temperament: "Grouchy"
});

george.save(function(err, cat) {
    if(err) {
        console.log("Something went wrong");
    } else {
        console.log("WE JUST SAVED A CAT TO THE DB: ")
        console.log(cat);
    }
});


Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat) {
    if(err) {
        console.log("ERROR");
    } else {
        console.log(cat);
    }
});



// retrieve all cats from the DB and console.log each one


Cat.find({}, function(err, cats) {
    if(err) {
        console.log("OH NO, ERROR");
        console.log(err);
    } else {
        console.log('ALL THE CATS....');
        console.log(cats);
    }
})

