var getArticle = function(response){
	
	var http = require('http');
	// var weather  = require('weather-js');

	var options = {
	'hostname': 'api.reddit.com',
	'port': 80,
	'path': '/hot',
	'method': 'GET',
	'headers': {'user-agent': 'Mozilla/5.0'}
	}

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

	// httpGetApi(options, callBack);

	// weather.find({search: 'Cebu', degreeType: 'F'}, function(err, result) {
	//   if(err) console.log(err);
	 
	//   //console.log(JSON.stringify(result, null, 2));
	//   JSON.stringify(result, null, 2)
	// });

	var Firebase = require('firebase');
	var myRootRef = new Firebase('https://rentie.firebaseio.com/article');
	// myRootRef.set("main");
	//myRootRef.push({title: Math.random().toString(36).substring(7) , url:"test",num: 20})
	var list = [];
	var displayChatMessage = function(message){		
		for (x in message){			
			list.push({'title':message[x].title})
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

var viewArticle = function(response, title){
	var Firebase = require('firebase');
	var myRootRef = new Firebase('https://rentie.firebaseio.com/article');
	myRootRef.orderByChild("title").equalTo(title).on("value", function(snapshot) {
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

exports.show = function(response){
	getArticle(response)
}
	
exports.add = function(response, post){
	addArticle(response, post)
}

exports.view = function(response, title){
	viewArticle(response, title)
}