searchType = ""
resultsDisplay = $("#results")
//function that gets ingredient details button
function IngredientDisplay(drinkID) {

    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+ drinkID,
        method: "GET"
    }).then(function(response){
        console.log(response.drinks[0])
        let ingredients = [];
        let instructions = response.drinks[0].strInstructions;

        for(var i = 0; i < 15; i++){
            let strIngredient = "strIngredient"+ (i+1);
            let strMeasure = "strMeasure"+ (i+1);
 
            if (response.drinks[0][strIngredient] != null){
                ingredients.push(response.drinks[0][strIngredient])
                if (response.drinks[0][strMeasure] != null){
                    ingredients.push(response.drinks[0][strMeasure])
                }
            }
        }
        let spacer=$("<hr>")
        let instructionsList= $("<ul>")
        for (var i=0; i<ingredients.length; i++){
            let ingInstruct=$("<li>")
            ingInstruct.text(ingredients[i] + " ");
            instructionsList.append(ingInstruct)
            instructionsList.append(spacer)
        }

        

        console.log(ingredients);
        console.log(instructions);

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
    if (searchType === "Ingredient") {
        drinksAPI =
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
    }


    $.ajax({
        url: drinksAPI,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.drinks.length; i++) {
            let cardHoriz = $('<div>').attr("class", "card mb-3");
            let card = $('<div>').attr("class", "row no-gutters");
            let cardTitle = $("<h3 class= card-title>")
            let cardBody = $('<div>').attr("class", "card-body");
            let Image = $('<img>').attr("class", "card-img")
            let imgDiv = $('<div>').attr("class", "col-md-4");
            let bodyDiv = $('<div>').attr("class", "col-md-8");
            let drinkPic = response.drinks[i].strDrinkThumb;
            Image.attr("src", drinkPic)
            let drinkName = response.drinks[i].strDrink;

            let explore = $("<button>See Ingredients</button>").attr("data-drinkID",response.drinks[i].idDrink).attr("class","btn btn-info ingredients").attr("data-toggle", "modal").attr("data-target", "#ingredientModal");;

            imgDiv.append(Image);
            card.append(imgDiv);
            cardTitle.append(drinkName);
            cardBody.append(cardTitle)
            cardBody.append(explore);
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
$("#byIngredient").on("click", function (event) {
    event.preventDefault();
    searchType = "Ingredient"

    return searchType
})

resultsDisplay.on("click", ".ingredients", function(event) {
    event.preventDefault();
    IngredientDisplay($(this)[0].attributes[0].value);

});