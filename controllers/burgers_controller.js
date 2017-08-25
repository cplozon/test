// create functions that do the routing for the burger app

var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

console.log("In burgers controller");

router.get('/', function(req,res){
    res.redirect('/burgers');
});

router.get('/burgers', function(req,res){
    burger.all(function(data){
        console.log("in controller getting data" + data);
        var hbsObject = {burgers: data};
        console.log("hbsObject " + hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/burgers/new', function(req,res){
    burger.create(['burger_name', 'devoured'], [req.body.burger, 0], function(){
        res.redirect('/burgers');
    });
});

router.put('/burgers/update/:id', function(req,res){
    var condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.update({devoured: req.body.devoured}, condition, function(){
        res.redirect('/burgers');
    });
});

router.delete('/burgers/delete/:id', function(req,res){
    var condition = req.params.id;
    burger.delete('id', condition, function(){
        res.redirect('/burgers');
    });
});

module.exports = router;

