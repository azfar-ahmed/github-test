// =========================
// 	CAMPGROUNDS ROUTES
// =========================

var express = require("express");
var router 	= express.Router({mergeParams: true});
var campground = require("../models/campground");
var comment = require("../models/comment");
var middleware = require("../middleware");

// INDEX // LIST/VIEW ALL CAMPGROUNDS PAGE
router.get("/", function(req, res){
	campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		}else{
		res.render("campground/index", {campgrounds: campgrounds, currentUser: req.user});	
		}
	})
	
});

// CREATE // POST ROUTE OF CAMPGROUNDS PAGE (that will add new campgrounds to the array)
router.post("/",middleware.isLoggedIn, function(req, res){
	var name  = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var desc  = req.body.description;
	var author={
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image: image, description: desc, author: author};
	
		// Create a new campground and add it to database
	campground.create(newCampground, function(err, newlyadded){
		if(err){
			console.log(err);
		}else{
			// redirect back to campground Page
			req.flash("success", "Campground Added Successfully!");
			res.redirect("/campgrounds");
		}
	});
	
});


//NEW 	-- SHOW FORM TO CREATE A NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campground/new");
});


//SHOW -- SHOW MORE INFO ABOUT ONE CAMPGROUND 
router.get("/:id", function(req, res){
	// find the campground with provided id
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			console.log(foundCampground);
			// render show template with that campground
			res.render("campground/show", {campground: foundCampground});
		}
	})
});

// EDIT CAMPGROUND ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
	campground.findById(req.params.id, function(err, foundCampground){
		res.render("campground/edit", {campground: foundCampground});
	});
});


// UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
	// find and update the correct campground
	campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			// redirect to somewhere( SHOW PAGE)
			req.flash("success", "Campground Edited Successfully!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("error", "Campground Deleted!");
			res.redirect("/campgrounds");
		}
	})
});

module.exports = router;