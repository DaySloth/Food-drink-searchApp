searchType = ""
resultsDispay = $("#results")
//function that gets ingredient details button
function IngredientDisplay() {
    let modalTitle = $(this).parent().strDrink;
    let ingredientsList = $('<ul>');
    let ing1= $(this).parent().strIngredient1;
    let newIng=$("<li>");
    newIng.append(ing1);
    ingredientsList.append(newIng);
    // let ing2= $(this).parent().strIngredient2
    // let ing3= $(this).parent().strIngredient3
    // let ing4= $(this).parent().strIngredient4
    // let ing5= $(this).parent().strIngredient5
    // let ing6= $(this).parent().strIngredient6
    // let ing7= $(this).parent().strIngredient7
    // let ing8= $(this).parent().strIngredient8
    // let ing9= $(this).parent().strIngredient9
    let instructions= $(this).parent().strInstructions

    console.log(newIng, ingredientsList, instructions)
    

    $('.modal-content').attr("style", "background-color: white; color: black");
    $('#modalTitle').text(modalTitle);
    $('#modalBody').html(ingredientsList);
    $('#modalBody').append(instructions);

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
            let explore = $("<button class=btn btn-info id=ingredients>See Ingredients</button>");
            imgDiv.append(Image);
            card.append(imgDiv);
            cardTitle.append(drinkName);
            cardBody.append(cardTitle)
            cardBody.append(explore);
            bodyDiv.append(cardBody);
            card.append(bodyDiv);
            cardHoriz.append(card);
            resultsDispay.append(cardHoriz);
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
resultsDispay.on("click", "#ingredients", function(event) {
    event.preventDefault();
    IngredientDisplay($(this));
});