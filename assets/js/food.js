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
        $('.modal-content').attr("style", "background-color: white; color: black");
        $('#modalTitle').text(modalTitle);
        $('#modalBody').html(ingredientsListUl);
    });
};




function searchForRecipe() {
    console.log(recipeSearch)
    allergies = [];
    let allergiesID = ["#dairy","#egg","#gluten","#peanut","#sesame","#seafood","#shellfish","#soy","#sulfite","#treeNut","#wheat"];
    let randomSearch = Math.floor(Math.random() * 50);
    for(var i = 0; i < allergiesID.length; i++){
        if($(allergiesID[i]).prop('checked')){
            allergies.push($(allergiesID[i]).attr("value"));
        }
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?offset=" + randomSearch +"&query=" + recipeSearch + "&intolerances=" + allergies.toString(),
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
            $("#recipeCardDiv").append($('<div>').attr("class", "alert alert-danger").text("No recipes found. Please adjust search paramaters and try again"));
        } else {
            for (var i = 0; i < 10; i++) {
                let recipeCardHoriz = $('<div>').attr("class", "card mb-3");
                let recipeCard = $('<div>').attr("class", "row no-gutters");
                let imageURL = "https://spoonacular.com/recipeImages/" + response.results[i].image;
                let foodImg = $('<img>').attr("class", "card-img").attr("src", imageURL).attr("style", "max-height: 20em; max-width: 20em");
                let imgDiv = $('<div>').attr("class", "col-md-4");
                let summaryDiv = $('<div>').attr("class", "col-lg-8");
                let recipeCardBody = $('<div>').attr("class", "card-body");
                let title = $('<h5>').attr("class", "card-title").text(response.results[i].title);
                let readyMin = $('<p>').attr("class", "card-text").text("Ready In: " + response.results[i].readyInMinutes + " min");
                let servings = $('<p>').attr("class", "card-text").text("Servings: " + response.results[i].servings);
                
                imgDiv.append(foodImg);
                recipeCard.append(imgDiv);
                recipeCardBody.append(title);
                recipeCardBody.append(readyMin);
                recipeCardBody.append(servings);
                recipeCardBody.append($("<button>").attr("id", "showIngredientsBtn").attr("class", "btn btn-primary ingredientsBtn").attr("data-recipeid", response.results[i].id).attr("data-toggle", "modal").attr("data-target", "#recipeModal").text("Show Ingredients"));
                recipeCardBody.append($('<br/>'));
                recipeCardBody.append($('<button>').attr("class", "btn btn-primary").attr("id", "addToRecipeBook").attr("data-toggle", "modal").attr("data-target", "#recipeModal").text("Add to Recipe Book"));
                summaryDiv.append(recipeCardBody);
                recipeCard.append(summaryDiv);
                recipeCardHoriz.append(recipeCard);
                $("#recipeCardDiv").append(recipeCardHoriz);
            };
        };
    });
};

$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    recipeSearch = $("#recipeSearch").val();
    searchForRecipe();
});

$("#recipeCardDiv").on("click", ".ingredientsBtn", function(event) {
    event.preventDefault();
    searchIngredients($(this).attr("data-recipeid"));
});

$("#recipeCardDiv").on("click", "#addToRecipeBook", function(event) {
    event.preventDefault();
    let recipeObj;
    recipeObj = {
        title: $(this).parent().children()[0].innerHTML,
        readyMin: $(this).parent().children()[1].innerHTML,
        servings: $(this).parent().children()[2].innerHTML,
        recipeId: $(this).parent().children()[3].dataset.recipeid,
        imgSrc: $(this).parent().parent().parent().children()[0].children[0].currentSrc,
    };
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
    if(savedRecipes){
        let condition = false;
        for(var i = 0; i < savedRecipes.length; i++){
            if(savedRecipes[i].title == recipeObj.title){
                condition = true;
            };
        };
        if(condition){
            console.log("already in storage not adding");
            $('.modal-content').attr("style", "background-color: #FFA2A2; color: #B81919");
            $('#modalTitle').text("Error");
            $('#modalBody').html("Already added to your "+ "<a href=./recipes.html>Recipe Book</a>");
        } else {
            console.log("adding");
            $('.modal-content').attr("style", "background-color: #B0EA85; color: #3F9500");
            $('#modalTitle').text("Success");
            $('#modalBody').html("Added to "+ "<a href=./recipes.html>Recipe Book</a>");
            savedRecipes.push(recipeObj);
        };
    }else{
        savedRecipes = [];
        $('.modal-content').attr("style", "background-color: #B0EA85; color: #3F9500");
            $('#modalTitle').text("Success");
            $('#modalBody').html("Added to "+ "<a href=./recipes.html>Recipe Book</a>");
        savedRecipes.push(recipeObj);
    };
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
});
