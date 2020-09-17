searchType = ""
resultsDispay= $("#results")
//function that gets ingredient details button
function getIngredients(){
    let instructions= 

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
        for (var i=0; i< response.drinks.length;i++){
        let picture=$("<img>");
        let drinkPic=response.drinks[i].strDrinkThumb;
        picture.attr("src",drinkPic);
        let drinkName=response.drinks[i].strDrink;
        let explore=$("<button>Details</button>");
        let drinkID=response.drinks[i].idDrink
        let newDiv=$("<div>");
        newDiv.append(picture);
        newDiv.append(drinkName);
        newDiv.append(explore);
        resultsDispay.append(newDiv);
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
    console.log(searchType)
    return searchType
})
$("#byIngredient").on("click", function (event) {
    event.preventDefault();
    searchType = "Ingredient"
    console.log(searchType)
    return searchType
})
