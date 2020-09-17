let recipeSearch;
let allergies = [];

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
        
        for(var i = 0; i < response.extendedIngredients.length; i++){
            ingredientsListUl.append($('<li>').text(response.extendedIngredients[i].original));
        };
        $('#modalTitle').text(modalTitle);
        $('#modalBody').html(ingredientsListUl);
    });
};




function searchForRecipe() {
    console.log(recipeSearch)
    allergies = [];
    let allergiesID = ["#dairy","#egg","#gluten","#peanut","#sesame","#seafood","#shellfish","#soy","#sulfite","#treeNut","#wheat"];

    for(var i = 0; i < allergiesID.length; i++){
        if($(allergiesID[i]).prop('checked')){
            allergies.push($(allergiesID[i]).attr("value"));
        }
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + recipeSearch + "&intolerances=" + allergies.toString(),
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "9493df4a93msh1173120d859372ap12bb8ajsnff91615f339b"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#recipeCardDiv").empty();
        if(response.results.length === 0){
            alert("no results");
        } else {
            for (var i = 0; i < 5; i++) {
                let recipeCard = $('<div>').attr("class", "card").attr("style", "width: 18rem");
                let imageURL = "https://spoonacular.com/recipeImages/" + response.results[i].image;
                let foodImg = $('<img>').attr("class", "card-img-top").attr("src", imageURL).attr("style", "width: inherited");
                let recipeCardBody = $('<div>').attr("class", "card-body");
                let title = $('<h5>').attr("class", "card-title").text(response.results[i].title);
                let readyMin = $('<p>').attr("class", "card-text").text("Ready In: " + response.results[i].readyInMinutes + " min");
                let servings = $('<p>').attr("class", "card-text").text("Servings: " + response.results[i].servings);
                
                recipeCard.append(foodImg);
                recipeCardBody.append(title);
                recipeCardBody.append(readyMin);
                recipeCardBody.append(servings);
                recipeCardBody.append($("<button>").attr("id", "showIngredientsBtn").attr("class", "btn btn-primary ingredientsBtn").attr("data-recipeid", response.results[i].id).attr("data-toggle", "modal").attr("data-target", "#recipeModal").text("Show Ingredients"));
                recipeCardBody.append($('<br/>'))
                recipeCardBody.append($('<button>').attr("class", "btn btn-primary").attr("id", "addToRecipeBook").text("Add to Recipe Book"));
                recipeCard.append(recipeCardBody);
                $("#recipeCardDiv").append(recipeCard);
            };
        };
    });
};

$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    recipeSearch = $("#recipeSearch").val();
    searchForRecipe();
});

$("#recipeCardDiv").on("click", ".ingredientsBtn", function (event) {
    event.preventDefault();
    searchIngredients($(this).attr("data-recipeid"));
});

$("#recipeCardDiv").on("click", "#addToRecipeBook", function (event) {
    event.preventDefault();
    let recipeObj = {
        title: $(this).parent().children()[0].innerHTML,
        readyMin: $(this).parent().children()[1].innerHTML,
        servings: $(this).parent().children()[2].innerHTML,
        recipeId: $(this).parent().children()[3].dataset.recipeid,
    };
    let savedRecipes = localStorage.getItem("savedRecipes")
    if(savedRecipes){
        if(savedRecipes.includes(recipeObj)){
            console.log("recipe already in storage")
        } else {
            savedRecipes.push(recipeObj);
            console.log("stored data: "+ savedRecipes);
        }
        
    }else{
        savedRecipes = [];
        savedRecipes.push(recipeObj);
        console.log("new data:");
        console.log(savedRecipes);
    };
    localStorage.setItem("savedRecipes");
});
