// Header and cookie options for Fetch() requests.
const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d49b963c9b1790102868fa8a468e6f9571619076712");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// Array of Spoonacular API keys
const apiKey = [
    "0b02b34a3d03459684b2e75f78070faf",
    "79edc81463084c748c02be93655d351f",
    "b126b486227f44c68a49b6779d33f513",
    "dcb55105e1cb45c9a317c95ee1ba12ab"];

// Index of selected API key
var currentApi = 0;
var conversionEnabled = 0;
var lastRecipe;

// Number of recipes to show on search.
const numberOfResults = 12;

const form = document.getElementById("form-main");
const formNav = document.getElementById("form-nav");
const inputField = document.getElementById("inputField");
const inputFieldNav = document.getElementById("inputField2");
const submitNav = document.getElementById("submit2");
const resultsContainer = document.querySelector(".results");
const recipeContainer = document.querySelector(".recipe");
const itemContainer = document.querySelector(".item");

form.addEventListener('submit', submitForm);
formNav.addEventListener('submit', submitForm);

// Display random recipes
//randomRecipes();

// OnClick() function for a search field.
function submitForm(evt) {

    let fieldValue;
    switch (evt.target.id) {
        case "form-main":
            fieldValue = inputField.value;
            break;
        case "form-nav":
            fieldValue = inputFieldNav.value;
            break;
    }
    searchRecipe(fieldValue);
}

// OnClick() function for a recipe unit toggle button.
function onToggleClick(evt) {
    if (evt.classList.contains('off')) {
        evt.classList.remove('off');
        conversionEnabled = false;
    } else {
        evt.classList.add('off');
        conversionEnabled = true;
    }

    document.querySelector(".ingredients-list").innerHTML = getIngredients(lastRecipe);
}

// Using Spoonacular API to display random recipes. 
function randomRecipes() {
    fetch(`https://api.spoonacular.com/recipes/random?number=${numberOfResults}&apiKey=${apiKey[currentApi]}`, requestOptions)
        .then(response => response.json())
        .then(result => showRandomRecipes(result))
        .catch(error => console.log('error', error));
}

function showRandomRecipes(result) {
    resultsContainer.innerHTML = "";
    // Loops through search results and arranges recipe data to results container.
    for (let i = 0; i < numberOfResults; i++) {
        resultsContainer.innerHTML +=
            `<div class="item" id="${result.recipes[i].id}" onClick="onRecipeItemClick(this.id)">
                <img class="image-box" width="312" height="231" src="${result.recipes[i].image}" alt="${result.recipes[i].title}">
                <p>${result.recipes[i].title}</p><br>
            </div>`;
    }
}


// Searches Spoonacular API with given search query. 
function searchRecipe(query) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${numberOfResults}&apiKey=${apiKey[currentApi]}`, requestOptions)
        .then(response => response.json())
        .then(result => showResults(result))
        .catch(error => console.log('error', error));
}

function showResults(result) {
    resultsContainer.innerHTML = "";
    // Loops through search results and arranges recipe data to results container.
    for (let i = 0; i < numberOfResults; i++) {
        resultsContainer.innerHTML +=
            `<div class="item" id="${result.results[i].id}" onClick="onRecipeItemClick(this.id)">
                <img class="image-box" src="${result.results[i].image}" alt="${result.results[i].title}">
                <p>${result.results[i].title}</p><br>
            </div>`;
    }
}
//Places related code

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

//OnClick() function for each recipe element. It has an ID parameter to know which element was clicked.
function onRecipeItemClick(id) {

    // Hiding recipe results view and showing recipe page.
    resultsContainer.style.display = "none";
    recipeContainer.style.display = "block";
    document.querySelector(".header").style.display = "none";
    document.querySelector(".container2").style.position = "relative";
    document.querySelector(".container2").style.width = "100%";

    // Searches Spoonacular API for additional recipe information with an unique ID.
    fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey[currentApi]}`, requestOptions)
        .then(response => response.json())
        .then(recipe => showRecipe(recipe))
        .catch(error => console.log('error', error));
}

// Converts ingredient units to desired system and returns formatted ingredient string.
function unitConversion(ingredient) {
    let ingredientAmount = ingredient.measures["us"].amount;
    if (conversionEnabled) {
        ingredientAmount = Math.round(ingredient.measures["metric"].amount);
        return "<p class='ingr-unit'>" + ingredientAmount + " " + ingredient.measures["metric"].unitShort + " " + `</p><p class='ingr-name'>` + ingredient.name + `</p>`;
    }

    return "<p class='ingr-unit'>" + ingredientAmount + " " + ingredient.measures["us"].unitShort + " " + `</p><p class='ingr-name'>` + ingredient.name + `</p>`;
}


// Loops through recipe ingredients and returns HTML with an list of ingredients.
function getIngredients(recipe) {
    lastRecipe = recipe;
    html = "";
    for (let i = 0; i < recipe.extendedIngredients.length; i++) {
        html += `<div class="unit-name-container">` + unitConversion(recipe.extendedIngredients[i]) + `</p> </div>`;
    }
    return html;
}

// Loops through recipe instructions and returns HTML with an ordered list.
function getInstructions(recipe) {
    html = "";
    for (let i = 0; i < recipe.analyzedInstructions[0].steps.length; i++) {
        html += `<li>` + recipe.analyzedInstructions[0].steps[i].step + `</li>`;
    }
    return html;
}

// Arranges recipe data to recipe container using innerHTML.
function showRecipe(recipe) {
    recipeContainer.innerHTML = `
    <div class="back-button"><a href="ajax.html"><img src="img/nuoli-icon.png"></a></div>
    <div class="recipe-container">
    <div class="col-1-1">
       <h1 class="title">${recipe.title}</h1>
       <div class="time-serv-container">
          <div class="clock-container">
             <img class="clock-icon" src="img/time-1.png">
             <p class="readyInMinutes"> ${recipe.readyInMinutes} MIN</p>
          </div>
          <div class="serv-container">
             <img class="clock-icon" src="img/serv-1.png">
             <p class="servings">${recipe.servings} SERVES</p>
          </div>
       </div>
    </div>
    <div class="col-2-1">
       <img class="image" src="${recipe.image}">
    </div>
    <div class="col-1-2">
       <div class="ingredients-card">
          <div class="toggleContainer" id="toggleContainer" onclick="onToggleClick(this)">
             <div class="switch" id="switch">
             </div>
             <div class="label left">US</div>
             <div class="label right">Metric</div>
          </div>
          <img class="ohje-icon" src="img/ingr.png">
          <h2 class="ingredients-steps-title">Ingredients</h2>
          <div class="ingredients-list">${getIngredients(recipe)}</div>
       </div>
    </div>
    <div class="col-2-2" >
       <div class="steps-card">
          <img class="ohje-icon" src="img/ohje.png">
          <h2 id="steps" class="ingredients-steps-title">Directions</h2>
          <ol>
             ${getInstructions(recipe)}
          </ol>
       </div>
    </div>
 </div>
    `;
}









