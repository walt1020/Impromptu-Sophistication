

var ingredientsArray = [];

var key = "50012ccb12d4c10d79d801e53c6adedb";



// $.ajax({
// 	url: punkAPI,
// 	method: "GET"
// }).done(function(response){
// 	console.log(response);
// })

function addIngredients(ingredient){
	ingredientsArray.push(ingredient);
	console.log(ingredient)
	console.log(ingredientsArray);
}
function getRecipesFromIngredients(){
	//var ingredientsUsed = ingredientsArray[Math.floor(Math.random() * 3)];
		//var ingredientsUsed = ingredientsArray[Math.floor(Math.random() * 3)];
		console.log(Math.floor(Math.random() * 3));
		var ingredientStr = "";
		for(var i =0;i<ingredientsArray.length;i++){
			ingredientStr = ingredientStr + ingredientsArray[i]+",";
		}
		var queryURL = "https://food2fork.com/api/search?key=50012ccb12d4c10d79d801e53c6adedb&q="+ingredientStr;
		
		console.log(queryURL); 
		var queryGetURL = "https://food2fork.com/api/get?key=50012ccb12d4c10d79d801e53c6adedb&rId=";
		var recipeID = "";

		// Transformed response makes the string response into a JSON object that we can use
		// to get the recipe_id 
		
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var transformedResponse = JSON.parse(response);
			console.log(transformedResponse);
			//var count = transformedResponse.count > 2? 2: count;
			var count = 0;
			if(transformedResponse.count>1){
				count = 1;
			}
			else{
				count = transformedResponse.count;
			}
			if(count==0){
				alert("No recipe");
			}
			else{
				for(var i=0; i<count; i++){
					console.log(transformedResponse.recipes[i].recipe_id);
					var recipeID = transformedResponse.recipes[i].recipe_id;
					getRecipe(recipeID);
				}
					// $.ajax({
					// 	url: "https://food2fork.com/api/get?key=50012ccb12d4c10d79d801e53c6adedb&rId=" + recipeID,
					// 	method: "GET"
					// }).done(function(getResponse) {
					// 	var transformedGETResponse = JSON.parse(getResponse);
					// 	// console.log(getResponse);
					// 	console.log(transformedGETResponse);
					// 	// console.log(transformedGETResponse.recipes[0].recipe_id);
					// 	// recipeID = transformedGETResponse.recipes[0].recipe_id;
					// 	// console.log(JSON.parse(response));
					// 	// console.log(response);
					// })
			}
			
		})


	function getRecipe(recipeID){
		$.ajax({
			url: queryGetURL + recipeID,
			method: "GET"
		}).done(function(getResponse) {
			var transformedGETResponse = JSON.parse(getResponse);
			// console.log(getResponse);
			console.log(transformedGETResponse);
			// console.log(transformedGETResponse.recipes[0].recipe_id);
			// recipeID = transformedGETResponse.recipes[0].recipe_id;
			// console.log(JSON.parse(response));
			// console.log(response);
		})

	}
}
$("#add").on("click",function(){
	var ingredients = $("#userInput").val().trim();
	addIngredients(ingredients);
	$("#userInput").val("");
});

$("#submit").on("click", function() {
		event.preventDefault();
		getRecipesFromIngredients();		
})

		   	
	


// function getRecipes() {


// }




var punkAPI = "https://api.punkapi.com/v2/beers?food"
