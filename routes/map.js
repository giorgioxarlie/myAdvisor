var express = require('express');
var router = express.Router();
const places = require('../bin/seeds');

router.get('/place',(req,res)=>{
  res.render('map/place',{places});
})

router.post('/map',(req,res,next)=>{
    const {name, lat, lng } = req.body;

    const newPos = new Pos({
        name,
        lng,
        lat
      });

      newPos.save()
        .then(() => {
          console.log(`Se ha creado la posición ${lat} ${lng}`);
          res.redirect("/")
        })
        .catch(e => next(e))
})

module.exports = router;