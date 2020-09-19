searchType = ""
resultsDispay = $("#results")
//function that gets ingredient details button
function IngredientDisplay(drinkID) {
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+ drinkID,
        method: "GET"
    }).then(function(response){
        console.log(response.drinks[0])
        let ingredients = [];
        let instructions = response.drinks[0].strInstructions;
        if(response.drinks[0].strIngredient1){
            if(response.drinks[0].strMeasure1){
                ingredients.push(response.drinks[0].strMeasure1 + " " + response.drinks[0].strIngredient1);
            } else{
                ingredients.push(response.drinks[0].strIngredient1);
            };
        };
        if(response.drinks[0].strIngredient2){
            if(response.drinks[0].strMeasure2){
                ingredients.push(response.drinks[0].strMeasure2 + " " + response.drinks[0].strIngredient2);
            } else{
                ingredients.push(response.drinks[0].strIngredient2);
            };
        };
        if(response.drinks[0].strIngredient3){
            if(response.drinks[0].strMeasure3){
                ingredients.push(response.drinks[0].strMeasure3 + " " + response.drinks[0].strIngredient3);
            } else{
                ingredients.push(response.drinks[0].strIngredient3);
            };
        };
        if(response.drinks[0].strIngredient4){
            if(response.drinks[0].strMeasure4){
                ingredients.push(response.drinks[0].strMeasure4 + " " + response.drinks[0].strIngredient4);
            } else{
                ingredients.push(response.drinks[0].strIngredient4);
            };
        };
        if(response.drinks[0].strIngredient5){
            if(response.drinks[0].strMeasure5){
                ingredients.push(response.drinks[0].strMeasure5 + " " + response.drinks[0].strIngredient5);
            } else{
                ingredients.push(response.drinks[0].strIngredient5);
            };
        };
        if(response.drinks[0].strIngredient6){
            if(response.drinks[0].strMeasure6){
                ingredients.push(response.drinks[0].strMeasure6 + " " + response.drinks[0].strIngredient6);
            } else{
                ingredients.push(response.drinks[0].strIngredient6);
            };
        };
        if(response.drinks[0].strIngredient7){
            if(response.drinks[0].strMeasure7){
                ingredients.push(response.drinks[0].strMeasure7 + " " + response.drinks[0].strIngredient7);
            } else{
                ingredients.push(response.drinks[0].strIngredient7);
            };
        };
        if(response.drinks[0].strIngredient8){
            if(response.drinks[0].strMeasure8){
                ingredients.push(response.drinks[0].strMeasure8 + " " + response.drinks[0].strIngredient8);
            } else{
                ingredients.push(response.drinks[0].strIngredient8);
            };
        };
        if(response.drinks[0].strIngredient9){
            if(response.drinks[0].strMeasure9){
                ingredients.push(response.drinks[0].strMeasure9 + " " + response.drinks[0].strIngredient9);
            } else{
                ingredients.push(response.drinks[0].strIngredient9);
            };
        };
        if(response.drinks[0].strIngredient10){
            if(response.drinks[0].strMeasure10){
                ingredients.push(response.drinks[0].strMeasure10 + " " + response.drinks[0].strIngredient10);
            } else{
                ingredients.push(response.drinks[0].strIngredient10);
            };
        };
        if(response.drinks[0].strIngredient11){
            if(response.drinks[0].strMeasure11){
                ingredients.push(response.drinks[0].strMeasure11 + " " + response.drinks[0].strIngredient11);
            } else{
                ingredients.push(response.drinks[0].strIngredient11);
            };
        };
        if(response.drinks[0].strIngredient12){
            if(response.drinks[0].strMeasure12){
                ingredients.push(response.drinks[0].strMeasure12 + " " + response.drinks[0].strIngredient12);
            } else{
                ingredients.push(response.drinks[0].strIngredient12);
            };
        };
        if(response.drinks[0].strIngredient13){
            if(response.drinks[0].strMeasure13){
                ingredients.push(response.drinks[0].strMeasure13 + " " + response.drinks[0].strIngredient13);
            } else{
                ingredients.push(response.drinks[0].strIngredient13);
            };
        };
        if(response.drinks[0].strIngredient14){
            if(response.drinks[0].strMeasure14){
                ingredients.push(response.drinks[0].strMeasure14 + " " + response.drinks[0].strIngredient14);
            } else{
                ingredients.push(response.drinks[0].strIngredient14);
            };
        };
        if(response.drinks[0].strIngredient15){
            if(response.drinks[0].strMeasure15){
                ingredients.push(response.drinks[0].strMeasure15 + " " + response.drinks[0].strIngredient15);
            } else{
                ingredients.push(response.drinks[0].strIngredient15);
            };
        };
        console.log(ingredients);
        console.log(instructions);
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
            let explore = $("<button>See Ingredients</button>").attr("data-drinkID", response.drinks[i].idDrink).attr("class", "btn btn-info ingredients");
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
resultsDispay.on("click", ".ingredients", function(event) {
    event.preventDefault();
    IngredientDisplay($(this)[0].attributes[0].value);
});