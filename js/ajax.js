const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d49b963c9b1790102868fa8a468e6f9571619076712");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const apiKey = "0b02b34a3d03459684b2e75f78070faf";
const apiKey2 = "79edc81463084c748c02be93655d351f";
const apiKey3 = "b126b486227f44c68a49b6779d33f513";
const apiKey4 = "dcb55105e1cb45c9a317c95ee1ba12ab";

const inputField = document.getElementById("inputField");
const submit = document.getElementById("submit");
const resultsContainer = document.querySelector(".results");
const recipeContainer = document.querySelector(".recipe");

const itemContainer = document.querySelector(".item");

const numberOfResults = 9;

function submitField(evt) {
    resultsContainer.innerHTML = "";
    searchRecipe(inputField.value);

}

function searchRecipe(query) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${numberOfResults}&apiKey=${apiKey}`, requestOptions)
        .then(response => response.json())
        .then(result => showResults(result))
        .catch(error => console.log('error', error));

}

function showResults(result) {

    // TODO change from innerHTML to DOM
    for (let i = 0; i < numberOfResults; i++) {
        resultsContainer.innerHTML +=
            `<div class="item" id="` + result.results[i].id + `" onClick="onRecipeItemClick(this.id)">
            <img src="` + result.results[i].image + `" alt="` + result.results[i].title + `">
            <p>` + result.results[i].title + `</p>
            <br>
          </div>`;
    }
}


function onRecipeItemClick(id) {
    resultsContainer.style.display = "none";
    recipeContainer.style.display = "block";

    fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`, requestOptions)
        .then(response => response.json())
        .then(recipe => showRecipe(recipe))
        .catch(error => console.log('error', error));
}

function showRecipe(recipe) {

    // TODO, muuta DOM? 
    // TODO, jos kuvaa ei löydy niin näytä placeholder




    recipeContainer.innerHTML = `
    <div class="recipe">
    <div class="col-1">
        <h1 class="title">` + recipe.title + `</h1>
        <p class="readyInMinutes">` + recipe.readyInMinutes + ` minutes</p>
        <p class="servings">` + recipe.servings + ` servings</p>
    </div>
d
    <div class="col-2">
        <img class="image" src="` + recipe.image + `">
    </div>

    <div class="col-1">
        <h2 class="ingredients-steps-title">Ingredients</h2>
        `+ getIngredients(recipe) + `
    </div>

    <div class="col-2">
        <h2 id="steps" class="ingredients-steps-title">Steps</h2>
        <ol>
        `+ getInstructions(recipe) + `
        </ol>
    </div>
    `;
}

function unitConversion(ingredient) {

    // TODO make toggle switch to toggle this value
    let conversionEnabled = true;

    if (conversionEnabled) {
        let ingredientAmount;

        if (ingredient.measures["metric"].amount >= 100) {
            ingredientAmount = Math.round((ingredient.measures["metric"].amount / 100) * 4) / 4;
        } else {
            ingredientAmount = ingredient.measures["metric"].amount;
        }

        return ingredientAmount + " " + ingredient.measures["metric"].unitShort + " " + ingredient.name;
    }

    return ingredient.originalString;
}

function getIngredients(recipe) {
    html = "";
    for (let i = 0; i < recipe.extendedIngredients.length; i++) {
        html += `<p>` + unitConversion(recipe.extendedIngredients[i]) + `</p>`;
    }
    return html;
}

function getInstructions(recipe) {
    html = "";
    for (let i = 0; i < recipe.analyzedInstructions[0].steps.length; i++) {
        html += `<li>` + recipe.analyzedInstructions[0].steps[i].step + `</li>`;
    }
    return html;
}


submit.addEventListener("click", submitField);




