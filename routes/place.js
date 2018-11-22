const Places = require('../models/Place');
const Review = require('../models/Review');
const User = require('../models/User');
const Comments = require('../models/Comment');
const express = require('express');

const router = express.Router();

router.get('/index', (req, res) => {
  Places.find().exec((err, places) => {
    res.render('place/index', { places });
  });
});

router.get('/detail/:id', (req, res) => {
  const placeId = req.params.id;

  Places.findById(placeId, (err, place) => {
    if (err) {
      return next(err);
    }
    return Review.find({ place: placeId }, (error, reviews) => {
      if (err)console.log(error);
      const num_stars = (
        reviews.reduce(
          (acc, e) => acc + e.prop1 + e.prop2 + e.prop3 + e.prop4 + e.prop5 + e.prop6,
          0,
        )
        / reviews.length
        / 6
      ).toFixed(2);
      const comment = reviews;
      res.render('place/detail', { place, stars: num_stars, comment });
    });
  });
});

router.get('/delete/:id', (req, res) => {
  const { id } = req.params;

  Places.findByIdAndRemove(id, (err, place) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/index');
  });
});

router.get('/review/:id', (req, res) => {
  const placeId = req.params.id;
  Places.findById(placeId, (err, place) => {
    console.log(place);
    res.render('place/review', { place });
  });
});

router.post('/comment/:id', (req, res, next) => {
  const userId = req.user.id;
  const placeId = req.params.id;
  const { comment } = req.body;
  const [prop1, prop2, prop3, prop4, prop5, prop6] = [req.body.proprieta, req.body.proprieta1, req.body.proprieta2, req.body.proprieta3, req.body.proprieta4, req.body.proprieta5];
  const c = new Review({
    place:placeId, owner:userId, comment, prop1, prop2, prop3, prop4, prop5, prop6,
  });
  c.save((err) => {
    if (err) { return next(err); }
    console.log(`Added ${comment} and ${prop1} to ${placeId}`);
    res.redirect(`/detail/${placeId}`);
    return 0;
  });
});

module.exports = router;
