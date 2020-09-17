const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.container');

left.addEventListener('mouseenter', () => {
    container.classList.add('hover-left');
});

left.addEventListener('mouseleave', () => {
    container.classList.remove('hover-left');
});

right.addEventListener('mouseenter', () => {
    container.classList.add('hover-right');
});

right.addEventListener('mouseleave', () => {
    container.classList.remove('hover-right');
});



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
            let recipeCard = $('<div>').attr("class", "recipe-card");
            let title = $('<h4>').text(response.results[i].title);
            let readyMin = $('<p>').text("Ready In: " + response.results[i].readyInMinutes + " min");
            let servings = $('<p>').text("Servings: " + response.results[i].servings);
            recipeCard.append(title);
            recipeCard.append(readyMin);
            recipeCard.append(servings);
            recipeCard.append($("<button>").attr("class", "ingredientsBtn").attr("data-recipeid", response.results[i].id).text("Show Ingredients"));
            recipeCard.append($("<hr>"));
            $("#recipeDiv").append(recipeCard);
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