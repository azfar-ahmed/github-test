const mongoose 	= require("mongoose");
var campground 	= require("./models/campground");
var comment    	= require("./models/comment");

// mongoose.connect('mongodb://localhost:27017/yelp_camp_v5', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to DB!'))
// .catch(error => console.log(error.message));

var data = [
	{
		name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do."
	},
	{
		name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed."
	},
	{
		name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
	}
]


function seedDB(){
	// REMOVE ALL CAMPGROUNDS
	campground.remove({}, function(err){
	if(err){
		console.log(err);
	}
	console.log("Campground removed!!!!");
		
	// ADD FEW CAMPGROUNDS
	data.forEach(function(seed){
		campground.create(seed, function(err, campground){
			if(err){
				console.log(err);
			}else{
				console.log("campgrounds added!!!");
				
				
	// ADD FEW COMMENTS
	comment.create(
		{
			text: "this is beautiful sight for camping",
			author: "Ahmer" 
		}, function(err, comment){
			if(err){
				console.log(err);
			}else{
				campground.comments.push(comment);
				campground.save();
				console.log("comments added");
			}
		   });
		}
		});
	});
});	
	
}

module.exports = seedDB;