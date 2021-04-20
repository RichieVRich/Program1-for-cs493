/*
 *  Basic Server with Handlebar
 *  Don't mess with unless told where to add
 *  Used the Example as a starting point
 */
var express = require('express')

var app = express();

app.use(express.json());
// set to port 4050 change if need
//var port = 4050

app.set('port', process.argv[2]);
/*
 *  Add Pages here with JS as require
 *  Page = shop.handlebars ( and located in views
 *  JS located in ./ with server
 */
app.use('/admin', require('./business.js'))
app.use('/', express.static('public'));

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// Run Server

app.listen(app.get('port'), function(){
//app.listen( port, function(){
//    console.log('Successfully launched at ' + port + '; Ctrl-C to end.');
    console.log('Successfully launched at ' + app.get('port') + '; Ctrl-C to end.');

});

