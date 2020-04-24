const express = require('express');

var router = express.Router();



router.get('/',function(req,res){
    res.send('Show all products');
});

router.get('/:name/:id',function(req,res){
    res.send(`Show products with name ${req.params.name} and id: ${req.params.id}`);
});
module.exports = router;