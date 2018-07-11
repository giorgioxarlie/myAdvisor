const express = require("express");
const router = express.Router();
const Places = require("../models/Place");
const Review = require("../models/Review");
const User = require("../models/User");
const Comments = require("../models/Comment");

router.get("/index", (req, res) => {
  Places.find().exec((err, places) => {
    res.render("place/index", { places });
  });
});

router.get("/detail/:id", (req, res) => {
  const placeId = req.params.id;

  Places.findById(placeId, (err, place) => {
    if (err) {
      return next(err);
    }
    Review.find({ place: placeId }, (err, reviews) => {
      if(err)console.log(err);
      let num_stars = (
        reviews.reduce(
          (acc, e) =>
            acc + e.prop1 + e.prop2 + e.prop3 + e.prop4 + e.prop5 + e.prop6,
          0
        ) /
        reviews.length /
        6
      ).toFixed(2);
      let comment = reviews;
      res.render("place/detail", { place: place, stars: num_stars, comment });
    });
  });
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;

  Places.findByIdAndRemove(id, (err, place) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/index");
  });
});

router.get("/review/:id", (req, res) => {
  const placeId = req.params.id;
  Places.findById(placeId , (err, place) => {
    console.log(place)
    res.render("place/review", { place });
  });
});

router.post('/comment/:id',(req, res,next)=>{
  let userId = req.user.id;
  let placeId = req.params.id;
  let comment = req.body.comment;
  let prop1 = req.body.proprieta;
  let prop2 = req.body.proprieta1;
  let prop3 = req.body.proprieta2;
  let prop4 = req.body.proprieta3;
  let prop5 = req.body.proprieta4;
  let prop6 = req.body.proprieta5;
  let c = new Review({place:placeId, owner:userId,comment: comment,prop1,prop2,prop3,prop4,prop5,prop6});
  c.save(err=>{
      if(err){return next(err)};
      console.log(`Added ${comment} and ${prop1} to ${placeId}`);
      res.redirect(`/detail/${placeId}`);
  })
})

module.exports = router;
