

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
	
		// setting a variable to an empty string
		var ingredientStr = "";

		// interating through ingredientsArray for however log it is, adding the value of whatever index ingredients array has to the empty string
		for(var i =0;i<ingredientsArray.length;i++){
			ingredientStr = ingredientStr + ingredientsArray[i]+",";
		}

		// creating a dynamic URL for recipe API search that takes the value of the previously empty string finds recipe ID's for the items
		var queryURL = "https://food2fork.com/api/search?key=50012ccb12d4c10d79d801e53c6adedb&q=" + ingredientStr;
		
		console.log(queryURL); 

		// making a dynamic URL for "get" response that takes the recipe ID returned from the first call and gives back recipes
		var queryGetURL = "https://food2fork.com/api/get?key=50012ccb12d4c10d79d801e53c6adedb&rId=";

		// creating an empty string that the recipeID will be stored in, that will be passed to the second AJAX call 	
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

			// setting up the parameters for how many results come back. If none come back we need to say so
			if(transformedResponse.count>5){
				count = 5;
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
			var recipeImage = $("<img>");
			// var recipeMakings = $("<li>");
			recipeImage.attr("src", transformedGETResponse.recipe.image_url);
			recipeImage.addClass("recipeImage");
			recipeImage.height(300);
			recipeImage.width(300);
			// for(var i=0; i<transformedGETResponse.recipe.ingredients.length; i++){
			// 	recipeMakings.text(transformedGETResponse.recipe.ingredients[i]);
			// }
			$("#your-ingredients").append(recipeImage);
			// $("#your-ingredients").html(recipeMakings);

		})

		

	}
}

// function addRecipeToScreen() {
// 	var recipeImage = $("<img>");
// 	recipeImage.attr("src", transformedGETResponse.recipe.image_url);
// 	$("#your-ingredients").append(recipeImage);
// }


function getBeersFromIngredient(beerIngredient) {

	// creating dynamic URL for beer API call 
	var beerQueryURL = "https://api.punkapi.com/v2/beers?food=" + beerIngredient + "&per_page=5";

	$.ajax({
			url: beerQueryURL,
			method: "GET"
		}).done(function(beerResponse) {
			// console.log(getResponse);
			console.log(beerResponse);
			// console.log(transformedGETResponse.recipes[0].recipe_id);
			// recipeID = transformedGETResponse.recipes[0].recipe_id;
			// console.log(JSON.parse(response));
			// console.log(response);
		})

}

// on click event for the "add" button, user needs to click add before he/she can submit
$("#add").on("click",function(){
	event.preventDefault();
	var ingredientList = $("<li>");
	var ingredients = $("#ingredient1-input").val().trim();
	addIngredients(ingredients);
	for(var i=0; i<ingredientsArray.length; i++){
			ingredientList.text(ingredientsArray[i]);
		}
	$("#your-ingredients").append(ingredientList);
	$("#ingredient1-input").val("");
});

// on click even for teh submit button that runs all the Ajax calls and returns all the recipe ID's, recipes, and beer pairings
$("#submit").on("click", function() {
		event.preventDefault();
		getRecipesFromIngredients();

		// Setting a variable to equal just one of the ingredients in the array that is made of the values given to it from the "add" button
		var foodForBeer = ingredientsArray[Math.floor(Math.random() * ingredientsArray.length)];
		
		
		getBeersFromIngredient(foodForBeer);		
})


