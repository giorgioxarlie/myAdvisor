const express = require('express');
const router = express.Router();
const Places = require('../models/Place');
const Review = require('../models/Review');
const Comments = require('../models/Comment');

router.get('/index',(req,res)=>{
    Places.find().exec((err, places) => {
        res.render('place/index', {places});
      });
    
})

router.get('/detail/:id', (req,res) => {
    const placeId = req.params.id;
  
    Places.findById(placeId, (err, place) => {
      if (err) { return next(err); }
      Review.find({place:placeId}, (err,reviews)=>{
        let num_stars = (reviews.reduce((acc,e)=> acc+e.stars,0)/reviews.length).toFixed(2);
          Comments.find({place:placeId}, (err,comment)=>{
            console.log(comment);
            res.render('place/detail', {place:place, stars:num_stars,comment});
          })
      })
    });
  })

module.exports = router;