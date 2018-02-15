const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Add a review with a star
router.get('/add-star/:id/:number', (req, res) => {
    let id = req.params.id;
    let number_stars = parseInt(req.params.number);
    let r =  new Review({ place: id, stars: number_stars });
    r.save(err => {
      if(err) { return next(err) };
      console.log(`ADDED ${number_stars} STAR TO PLACE ${id}`);
      res.redirect(`/detail/${id}`);
    })
});

module.exports = router;