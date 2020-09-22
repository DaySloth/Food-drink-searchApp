searchType = ""
resultsDisplay = $("#results")
let spacer = $("<hr>")
//function that gets ingredient details button
function IngredientDisplay(drinkID) {

    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID,
        method: "GET"
    }).then(function (response) {
  
        let ingredients = [];
        let instructions = response.drinks[0].strInstructions;

        for (var i = 0; i < 15; i++) {
            let strIngredient = "strIngredient" + (i + 1);
            let strMeasure = "strMeasure" + (i + 1);

            if (response.drinks[0][strIngredient] != null) {
                ingredients.push(response.drinks[0][strIngredient])
                if (response.drinks[0][strMeasure] != null) {
                    ingredients.push(response.drinks[0][strMeasure])
                }
            }
        }
        let instructionsList = $("<ul>")
        for (var i = 0; i < ingredients.length; i++) {
            let ingInstruct = $("<li>")
            ingInstruct.text(ingredients[i] + " ");
            instructionsList.append(ingInstruct)
            instructionsList.append(spacer)
        }


        $('.modal-content').attr("style", "background-color: white; color: black");
        $('#modalTitle').text(response.drinks[0].strDrink + " Recipe");
        $('#modalBody').html(instructionsList);
        $('#modalBody').append(instructions);

    });

}

function DrinkSearch() {


    if (searchType === "Name") {
        var drinksAPI =
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
    }
    else if (searchType === "Surprise") {
            var drinksAPI="https://www.thecocktaildb.com/api/json/v1/1/random.php";
    }
    else{
        var drinksAPI =
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
    }
    resultsDisplay.empty();
    $.ajax({
        url: drinksAPI,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.drinks.length; i++) {
            let cardHoriz = $('<div>').attr("class", "card mb-3");
            let card = $('<div>').attr("class", "row no-gutters");
            let cardTitle = $("<h3 class= card-title>")
            let cardBody = $('<div>').attr("class", "card-body");
            let Image = $('<img>').attr("class", "card-img").attr("style", "max-width: 18em");
            let imgDiv = $('<div>').attr("class", "col-md-4");
            let bodyDiv = $('<div>').attr("class", "col-md-8");
            let drinkPic = response.drinks[i].strDrinkThumb;
            Image.attr("src", drinkPic)
            let drinkName = response.drinks[i].strDrink;

            let explore = $("<button>See Ingredients</button>").attr("data-drinkID", response.drinks[i].idDrink).attr("class", "btn btn-info ingredients").attr("data-toggle", "modal").attr("data-target", "#ingredientModal");;

            imgDiv.append(Image);
            card.append(imgDiv);
            cardTitle.append(drinkName);
            cardBody.append(cardTitle)
            cardBody.append(explore);
            cardBody.append($('<button>').attr("class", "btn btn-primary").attr("id", "addToRecipeBook").attr("data-toggle", "modal").attr("data-target", "#ingredientModal").text("Add to Recipe Book"));
            bodyDiv.append(cardBody);
            card.append(bodyDiv);
            cardHoriz.append(card);
            resultsDisplay.append(cardHoriz);
        }
    })
}

$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    drinkName = $("#whatDrink").val();
    DrinkSearch();
})

$("#byName").on("click", function (event) {
    event.preventDefault();
    searchType = "Name"

    return searchType
})
$("#supriseMe").on("click", function (event) {
    event.preventDefault();
    searchType = "Surprise"

    return searchType
})

resultsDisplay.on("click", ".ingredients", function (event) {
    event.preventDefault();
    IngredientDisplay($(this)[0].attributes[0].value);

});
resultsDisplay.on("click", "#addToRecipeBook", function (event) {
    event.preventDefault();
    let drinkRecipeObj;
    drinkRecipeObj = {
        title: $(this).parent().children()[0].innerHTML,
        imgSrc: $(this).parent().parent().parent().children()[0].children[0].currentSrc,
        drinkID:$(this).parent()[0].children[1].dataset.drinkid

    };
    console.log(drinkRecipeObj)
    let savedDrinkRecipes = JSON.parse(localStorage.getItem("savedDrinkRecipes"));
    if (savedDrinkRecipes) {
        let condition = false;
        for (var i = 0; i < savedDrinkRecipes.length; i++) {
            if (savedDrinkRecipes[i].title == drinkRecipeObj.title) {
                condition = true;
            };
        };
        if (condition) {
            $('.modal-content').attr("style", "background-color: #FFA2A2; color: #B81919");
            $('#modalTitle').text("Error");
            $('#modalBody').html("Already added to your " + "<a href=./recipes.html>Recipe Book</a>");
        } else {
            $('.modal-content').attr("style", "background-color: #B0EA85; color: #3F9500");
            $('#modalTitle').text("Success");
            $('#modalBody').html("Added to " + "<a href=./recipes.html>Recipe Book</a>");
            savedDrinkRecipes.push(drinkRecipeObj);
        };
    } else {
        savedDrinkRecipes = [];
        $('.modal-content').attr("style", "background-color: #B0EA85; color: #3F9500");
        $('#modalTitle').text("Success");
        $('#modalBody').html("Added to " + "<a href=./recipes.html>Recipe Book</a>");
        savedDrinkRecipes.push(drinkRecipeObj);
    };
    localStorage.setItem("savedDrinkRecipes", JSON.stringify(savedDrinkRecipes));
});