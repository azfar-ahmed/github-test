var campground = require("../models/campground");
var comment    = require("../models/comment");

var middlewareObj = {};

// FUNCTION checkCampgroundOwnership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found!");
				res.redirect("back");
			}else{
				// does user own the campground
			// CAMPARING "Campground object id" with "user id"  by using built mongoose  "equal" method 
				if(foundCampground.author.id.equals(req.user._id)){
				next();	// NEXT() will go to EDIT/ UPDATE/ DELETE ROUTE to execute that code		
			}else{
				req.flash("error", "Permission denied!!!")
				res.redirect("back");
			}
		}
	});
		}else{
			req.flash("error", "You need  to be log in!")
			res.redirect("back");
		}
}


// FUNCTION checkCommentOwnership
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Permision denied!!!")
				res.redirect("back");
			}else{
				// does user own the comment
			// CAMPARING "Campground object id" with "user id"  by using built mongoose  "equal" method 
				if(foundComment.author.id.equals(req.user._id)){
				// NEXT() will go to EDIT/ UPDATE/ DELETE ROUTE to execute that code	
				next();			
			}else{
				
				res.redirect("back");
			}
		}
	});
		}else{
			req.flash("error", "You need to be login!")
			res.redirect("back");
		}
}
	// MIDDLEWARE  (FUNCTION ISLOGGEDIN)
 middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	 
	 // SHOW DISPLAY MESSAGE FOR FLASH
	 req.flash("error", "You need to be login!");
	 res.redirect("/login");
}




module.exports = middlewareObj;