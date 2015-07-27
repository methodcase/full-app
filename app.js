var express  =  require('express');
var session = require('express-session');
var app = express();	
var bodyParser  =require('body-parser');
var router = require('./rest/router.js');

app.use(session({secret: 'mysecret'}));
app.use(express.static(__dirname));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

router(app); // call the router module where the routes are set.

app.listen(3100); // express server
console.log("Server running at http://localhost:3100/");	