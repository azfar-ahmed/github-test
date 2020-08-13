var  express 		= require("express"),
	 app 			= express(),
	 bodyParser 	= require("body-parser"),
	 mongoose 		= require("mongoose"),
	 flash 			= require("connect-flash"),
	 passport 		= require("passport"),
	 LocalStrategy 	= require("passport-local"),
	 methodOverride	= require("method-override"),
	 campground 	= require("./models/campground"),
	 comment    	= require("./models/comment"),
	 User			= require("./models/user"),
	 seedDB 		= require("./seeds");

// REQUIRING ROUTES
var auth_indexRoutes = require("./routes/auth_index"),
	campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes	 = require("./routes/comments");


//===============Mongoose require Setup=================

// mongoose.connect('mongodb://localhost:27017/yelp_camp_v10', {
mongoose.connect('mongodb+srv://azfar-ahmed:aakm+1988@cluster0.jdja3.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
//=======================================================

		// Body Parser and EJS use in file 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
		// console.log(__dirname); (It will show the current directory so if there is any change of path it will work)
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); 
		// it shows flash messages	
app.use(flash());   
		//Seed the database
// seedDB(); 
 
// ===================== PASSPORT SETUP =====================================
app.use(require("express-session")({
	secret: "Azfar Ahmed Khan",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());		
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error     = req.flash("error");
	res.locals.success     = req.flash("success");
	next();
});
// ==========================================================================


app.use("/",auth_indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


var PORT = process.env.PORT || 3000;
app.listen("PORT", function(){
	console.log("Server is connected!!!");
});



// 		// For listen app
// app.listen(3000, function(){
// 	console.log("server is connected!!!");
// });






















