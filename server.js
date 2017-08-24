//setting up server file

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var path = require('path');


var app = express();

// content from the public directory

app.use(express.static(process.cwd() + '/public'));



app.use(bodyParser.urlencoded({
    extended: false
}));

// override with POST 

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

/// specific to CAT app////

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

var port = 3000;
app.listen(port);