var getArticle = function(response){
	
	var http = require('http');
	
	var callBack = function(d){
		var list = [];
	    d.data.children.map(function(a){
	        list.push({title:a.data.title});
	    });	    	       
	    response.send(list);
	}
		
	var httpGetApi = function(options, caller){
		http.get(options, function(res){
			var body = '';
			res.on('data', function(chunk){
				body += chunk
			})

			res.on('end', function(){
				var info = JSON.parse(body)
				caller(info)
			})
		})
	};
	

	var Firebase = require('firebase');
	var myRootRef = new Firebase('https://rentie.firebaseio.com/article');

	var list = [];
	var displayChatMessage = function(message){		
		for (x in message){			
			list.push({'title':message[x].title,'id':x})
		}
		response.send(list)
	}
	
	myQuery = myRootRef.endAt().limitToLast(500);
	myQuery.once('value', function(snapshot){		
		var message = snapshot.val();
		// console.log(message)
		displayChatMessage(message)
	});		

}

var viewArticle = function(response, id){
	var Firebase = require('firebase');
	var myRootRef = new Firebase('https://rentie.firebaseio.com/article');
	myRootRef.orderByKey().equalTo(id).on("value", function(snapshot) {
		var result = snapshot.val()

		for (x in result){
			response.send(result[x])
		}
	});
	
}

var addArticle = function(response, post){
	var Firebase = require('firebase');
	var myRootRef = new Firebase('https://rentie.firebaseio.com/article');
	console.log(post)
	myRootRef.push(post)
	response.redirect('http://localhost:3100/#/home');	
}

var getCountries = function(response) {
	var http = require('http');
	var options = {
	'hostname': 'api.reddit.com',
	'port': 80,
	'path': '/hot',
	'method': 'GET',
	'headers': {'user-agent': 'Mozilla/5.0'}
	}

	var callBack = function(d){
	    d.data.children.map(function(a){
	        res.send(a.data.title);
	    });
	}

	http.get(options, function(res){
	    console.log(res.statusCode)
	    var body = '';
	    res.on('data', function(chunk){
	        body += chunk
	    });
	    res.on('end', function(){
	        var info = JSON.parse(body);
	        callBack(info)
	    });
	}, callBack);
}
exports.show = function(response){
	getArticle(response)
}
	
exports.add = function(response, post){
	addArticle(response, post)
}

exports.view = function(response, title){
	viewArticle(response, title)
}