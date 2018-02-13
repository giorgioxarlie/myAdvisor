const express = require('express');
const router = express.Router();
const Places = require('../models/Place');

router.get('/map',(req,res)=>{
  Places.find().exec((err, places) => {
    res.render('map', {places});
  });
})

router.post('/map',(req,res,next)=>{
    const {name, lat, lng } = req.body;

    const newPos = new Places({
        name,
        location:{lng,lat},
      });

      newPos.save()
        .then(() => {
          console.log(`Se ha creado la posición ${lat} ${lng}`);
          res.redirect("/")
        })
        .catch(e => next(e))
})

module.exports = router;