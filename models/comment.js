const mongoose 	= require('mongoose');
// mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to DB!'))
// .catch(error => console.log(error.message));

var commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
	
});

module.exports =  mongoose.model("comment", commentSchema);
