searchType = ""
resultsDispay = $("#results")
//function that gets ingredient details button
// function getIngredients() {
//     let instructions = 

// }

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
        let cardHoriz = $('<div>').attr("class", "card mb-3");
        let card = $('<div>').attr("class", "row no-gutters");
        let cardBody = $('<div>').attr("class", "card-body");
        let Image = $('<img>').attr("class", "card-img-top")
        let imgDiv = $('<div>').attr("class", "col-md-4");
        let bodyDiv = $('<div>').attr("class", "col-md-8");
        // if (response.drinks.length === 0); {
        //     noResults = $("<h5>No Results Found. Try a new search!</h5>");
        //     resultsDispay.append(noResults);
           
        // }
        // elseif (response.drinks.length>0); { 
            for (var i = 0; i < response.drinks.length; i++) {
                let drinkPic = response.drinks[i].strDrinkThumb;
                Image.attr("src", drinkPic).attr("style", "width: 18cm");
                let drinkName = response.drinks[i].strDrink;
                let explore = $("<button>Details</button>");
                let drinkID = response.drinks[i].idDrink;
                imgDiv.append(Image);
                card.append(imgDiv);
                bodyDiv.append(drinkName);
                bodyDiv.append(explore);
                cardBody.append(bodyDiv);
                card.append(cardBody);
                cardHoriz.append(card);
                resultsDispay.append(cardHoriz);
                //thinking of using this for checking ingredients to be able to flag allergens
                return drinkID
            // }
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
