let savedFoodRecipes = JSON.parse(localStorage.getItem("savedRecipes"));

function init(){
    if(savedFoodRecipes){
        for (var i = 0; i < savedFoodRecipes.length; i++) {
            let recipeCard = $('<div>').attr("class", "card");
            let foodImg = $('<img>').attr("class", "card-img-top").attr("src", savedFoodRecipes[i].imgSrc).attr("style", "width: 20%");
            let recipeCardBody = $('<div>').attr("class", "card-body");
            let title = $('<h5>').attr("class", "card-title").text(savedFoodRecipes[i].title);
            let readyMin = $('<p>').attr("class", "card-text").text("Ready In: " + savedFoodRecipes[i].readyMin + " min");
            let servings = $('<p>').attr("class", "card-text").text("Servings: " + savedFoodRecipes[i].servings);
            
            recipeCard.append(foodImg);
            recipeCardBody.append(title);
            recipeCardBody.append(readyMin);
            recipeCardBody.append(servings);
            recipeCardBody.append($("<button>").attr("id", "showIngredientsBtn").attr("class", "btn btn-primary ingredientsBtn").attr("data-recipeid", savedFoodRecipes[i].recipeId).attr("data-toggle", "modal").attr("data-target", "#recipeModal").text("Show Ingredients"));
            recipeCardBody.append($('<br/>'))
            recipeCardBody.append($('<button>').attr("class", "btn btn-primary").attr("id", "deleteFromRecipeBook").text("Delete Recipe"));
            recipeCard.append(recipeCardBody);
            $("#foodRecipeDiv").append(recipeCard);
        };
    }else{
        alert("no recipes")
    };
};


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
        let modalTitle = response.title;
        let ingredientsListUl = $('<ul>');
        let instructionsList = $('<ol>');
        
        for(var i = 0; i < response.extendedIngredients.length; i++){
            ingredientsListUl.append($('<li>').text(response.extendedIngredients[i].original));
        };
        for(var i = 0; i < response.analyzedInstructions[0].steps.length; i++){
            instructionsList.append($('<li>').text(response.analyzedInstructions[0].steps[i].step));
        };
        $('#modalTitle').text(modalTitle);
        $('#modalBody').empty();
        $('#modalBody').append($('<h6>').text("Ingredients:"));
        $('#modalBody').append(ingredientsListUl);
        $('#modalBody').append($('<h6>').text("Instructions:"));
        $('#modalBody').append(instructionsList);
    });
};

init();

$("#foodRecipeDiv").on("click", ".ingredientsBtn", function (event) {
    event.preventDefault();
    searchIngredients($(this).attr("data-recipeid"));
});
