const mongoose 	= require('mongoose');
// mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to DB!'))
// .catch(error => console.log(error.message));


var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
		
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comment"
		}
	]
});

module.exports =  mongoose.model("campground", campgroundSchema);