searchType = ""
resultsDispay = $("#results")
//function that gets ingredient details button
function getIngredients() {
    let instructions = 

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
        method: "GET",
    }).then(function (response) {
        console.log(response);
        let DrinkCardHoriz = $('<div>').attr("class", "card mb-3");
        let DrinkCard = $('<div>').attr("class", "row no-gutters");
        let DrinkCardBody = $('<div>').attr("class", "card-body");
        let Image = $('<img>').attr("class", "card-img-top")
        let imgDiv = $('<div>').attr("class", "col-md-4");
        let bodyDiv = $('<div>').attr("class", "col-md-8");
        if (response.drinks.length === 0); {
            noResults = $("<h5>No Results Found. Try a new search!</h5>");
            resultsDispay.append(noResults);
           
        }
        if (response.drinks.length>0){ 
            for (var i = 0; i < response.drinks.length; i++) {
                let drinkPic = response.drinks[i].strDrinkThumb;
                picture.attr("src", drinkPic).attr("style", "width: 18cm");
                let drinkName = response.drinks[i].strDrink;
                let explore = $("<button>Details</button>");
                let drinkID = response.drinks[i].idDrink
                let newDiv = $("<div>");
                newDiv.append(picture);
                newDiv.append(drinkName);
                newDiv.append(explore);
                resultsDispay.append(newDiv);
        }
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
    if ($("#byName".prop('checked')){
        searchType = "Name"
    }
    return searchType
})
$("#byIngredient").on("click", function (event) {
    event.preventDefault();
    if ($("#byIngredient".prop('checked')){
        searchType = "Ingredient"
    }

    return searchType
})
