const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/map',(req,res)=>{
  res.render('map',{places});
})
router.get('/private', isLoggedIn, function(req, res, next) {
  res.render('private');
});

router.get('/onlyme', onlyMe, function(req, res, next) {
  res.render('private');
});

module.exports = router;
