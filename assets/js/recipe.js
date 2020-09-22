function init(){
    $("#foodRecipeDiv").empty();
    let savedFoodRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
    if(savedFoodRecipes){
        if(savedFoodRecipes[0] !== undefined){
            for (var i = 0; i < savedFoodRecipes.length; i++) {
                let recipeCardHoriz = $('<div>').attr("class", "card mb-3");
                let recipeCard = $('<div>').attr("class", "row no-gutters");
                let imgDiv = $('<div>').attr("class", "col-md-4");
                let foodImg = $('<img>').attr("class", "card-img").attr("src", savedFoodRecipes[i].imgSrc);
                let summaryDiv = $('<div>').attr("class", "col-md-8");
                let recipeCardBody = $('<div>').attr("class", "card-body");
                let title = $('<h5>').attr("class", "card-title").text(savedFoodRecipes[i].title);
                let readyMin = $('<p>').attr("class", "card-text").text(savedFoodRecipes[i].readyMin);
                let servings = $('<p>').attr("class", "card-text").text(savedFoodRecipes[i].servings);
                
                imgDiv.append(foodImg);
                recipeCard.append(imgDiv);
                recipeCardBody.append(title);
                recipeCardBody.append(readyMin);
                recipeCardBody.append(servings);
                recipeCardBody.append($("<button>").attr("id", "showIngredientsBtn").attr("class", "btn btn-primary ingredientsBtn").attr("data-recipeid", savedFoodRecipes[i].recipeId).attr("data-toggle", "modal").attr("data-target", "#recipeModal").text("Show Ingredients/Instructions"));
                recipeCardBody.append($('<br/>'))
                recipeCardBody.append($('<button>').attr("class", "btn btn-primary").attr("id", "deleteFromRecipeBook").text("Delete Recipe"));
                summaryDiv.append(recipeCardBody);
                recipeCard.append(summaryDiv);
                recipeCardHoriz.append(recipeCard);
                $("#foodRecipeDiv").append(recipeCardHoriz);
            };
        }else{
            $("#foodRecipeDiv").append($('<div>').attr("class", "alert alert-danger").text("No recipes saved"));
        };
        
    }else{
        $("#foodRecipeDiv").append($('<div>').attr("class", "alert alert-danger").text("No recipes saved"));
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

$("#foodRecipeDiv").on("click", "#deleteFromRecipeBook", function (event) {
    event.preventDefault();
    let compareID = $(this).parent().children()[3].dataset.recipeid;
    let savedFoodRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
    console.log(savedFoodRecipes);
    for(var i = 0; i < savedFoodRecipes.length; i++){
        if(savedFoodRecipes[i].recipeId == compareID){
            savedFoodRecipes.splice(i, 1);
        }
    };
    localStorage.setItem("savedRecipes", JSON.stringify(savedFoodRecipes));
    init();
});
