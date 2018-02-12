const express = require('express');
const router = express.Router();
const places = require('../bin/seeds');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.get('/place',(req,res)=>{
  res.render('place',{places});
})

module.exports = router;
