var express = require("express");
var router 	= express.Router();
var passport = require("passport");
var User 	= require("../models/user");


// ROOT ROUTE (HOME PAGE FOR CAMPGROUNDS)
router.get("/", function(req, res){
	res.render("landing");
});  



//================================================
//=========== AUTH ROUTES ========================
//================================================

// SHOW REGISTER FORM	
router.get("/register", function(req, res){
	res.render("register");
});

// HANDLE SIGNUP LOGIC
router.post("/register", function(req, res){
	// req.body.username (for username) 
	// req.body.password (for password)
	var newUser = new User({username: req.body.username});
	User.register( newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		})
		
	});
});

	// SHOW LOGIN FORM
router.get("/login", function(req, res){
	res.render("login");
});

// HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local",
	{	
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
	
});

	// LOGOUT LOGIC
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "logged you out");
	res.redirect("/campgrounds");
});


module.exports = router;
