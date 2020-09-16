let recipeSearch;


function searchIngredients(recipeid) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeid + "/information",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "9493df4a93msh1173120d859372ap12bb8ajsnff91615f339b"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
};




function searchForRecipe() {
    console.log(recipeSearch)
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + recipeSearch,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "9493df4a93msh1173120d859372ap12bb8ajsnff91615f339b"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#recipeDiv").empty();
        for (var i = 0; i < 5; i++) {
            let recipeCard = $('<div>').attr("class", "card");
            let foodImg = $('<img>').attr("class", "card-img-top");
            let recipeCardBody = $('<div>').attr("class", "card-body");
            let title = $('<h5>').attr("class", "card-title").text(response.results[i].title);
            let readyMin = $('<p>').attr("class", "card-text").text("Ready In: " + response.results[i].readyInMinutes + " min");
            let servings = $('<p>').attr("class", "card-text").text("Servings: " + response.results[i].servings);
            recipeCard.append(foodImg);
            recipeCardBody.append(title);
            recipeCardBody.append(readyMin);
            recipeCardBody.append(servings);
            recipeCardBody.append($("<button>").attr("id", "showIngredientsBtn").attr("class", "btn btn-primary ingredientsBtn").attr("data-recipeid", response.results[i].id).text("Show Ingredients"));
            recipeCardBody.append($('<button>').attr("class", "btn btn-primary").attr("id", "addToRecipeBook"));
            recipeCard.append(recipeCardBody);
            $("#recipeCardDiv").append(recipeCard);
        };
    });
};

$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    recipeSearch = $("#recipeSearch").val();
    searchForRecipe();
});

$("#recipeDiv").on("click", ".ingredientsBtn", function (event) {
    event.preventDefault();
    searchIngredients($(this).attr("data-recipeid"));
});