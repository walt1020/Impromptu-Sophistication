

var punkAPI = "https://api.punkapi.com/v2/beers?food=bacon";

var key = "50012ccb12d4c10d79d801e53c6adedb";
var queryURL = "https://food2fork.com/api/get?key=50012ccb12d4c10d79d801e53c6adedb&rId=35120";

$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response) {
	console.log(JSON.parse(response));
})


$.ajax({
	url: punkAPI,
	method: "GET"
}).done(function(response){
	console.log(response);
})







