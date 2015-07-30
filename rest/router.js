module.exports = function(app){
	var sess;
	
	app.get('/', function(req, res){
		sess=req.session;
		res.render('index.html')
	});
	
	app.get("/rest/article", function(req, res){
		var article = require('./article.api.js')				
		article.show(res);		

	});
	
	app.post("/rest/add/article", function(req, res){
		var article = require('./article.api.js')
		article.add(res, req.body);		
	});	
	
	app.get("/rest/view/article/:id", function(req, res){
		var title = req.params.id
		var article = require('./article.api.js')
		article.view(res, title)
	});
	
	app.post('/rest/login',function(req,res){
		sess = req.session;		
		sess.username = req.body.username;
		console.log(sess.username);
		// res.end('done');
		res.redirect("/securepage");
	});
	
	app.get('/securepage',function(req,res){
		sess=req.session;
		if (sess.username == "testing")
			res.send("ok");
		else
			res.send('invalid');
	});
}