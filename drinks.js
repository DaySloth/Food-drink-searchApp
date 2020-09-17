searchType = ""
console.log(searchType)
function DrinkSearch() {
    //value assigned to search type by checkbox


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
    return
})
$("#byIngredient").on("click", function (event) {
    event.preventDefault();
    searchType = "Ingredient"
    console.log(searchType)
    return
})