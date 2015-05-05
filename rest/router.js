module.exports = function(app){
		
	app.get('/', function(req, res){
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
}