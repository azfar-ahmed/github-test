
// =========================
// 	COMMENTS ROUTES
// =========================

var express = require("express");
var router 	= express.Router({mergeParams: true});
var campground = require("../models/campground");
var comment = require("../models/comment");
var middleware = require("../middleware");


// COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
	campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comment/new", {campground: campground});
		}
	});
});


// COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	// lookup campground by using ID
	campground.findById(req.params.id, function(err, campground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong!!!")
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "successfully added Comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
			
		}
	})
});

//  COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			}else{
				res.render("comment/edit", {campground_id: req.params.id, comment: foundComment});
			} 
		});
});


// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success", "Comment Edited Successfully!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});


// DESTROY COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership,  function(req, res){
	// FindByIdAndRemove
	comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("error", "Comment Deleted!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});


module.exports = router;