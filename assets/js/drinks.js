searchType = ""
resultsDisplay = $("#results")
//function that gets ingredient details button
function IngredientDisplay(drinkID) {
    var drinkAPI= "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+drinkID

    $.ajax({
        url: drinkAPI,
        method: "GET"
    }).then(function (response) {
      
        // for (var i=1; i<16; i++){
        //     I= JSON.stringify(i)
        //     for (var I in response.drinks[0]) {
           
        }
    })
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
            let explore = $("<button>See Ingredients</button>").attr("data-drinkID",response.drinks[i].idDrink).attr("class","btn btn-info ingredient");
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
resultsDisplay.on("click", ".ingredient", function(event) {
    event.preventDefault();
    IngredientDisplay(($(this)[0].attributes[0].value));
});