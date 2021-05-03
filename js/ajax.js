const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d49b963c9b1790102868fa8a468e6f9571619076712");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const apiKey = "79edc81463084c748c02be93655d351f";
const apiKey2 = "79edc81463084c748c02be93655d351f";
const apiKey3 = "b126b486227f44c68a49b6779d33f513";
const apiKey4 = "dcb55105e1cb45c9a317c95ee1ba12ab";

const inputField = document.getElementById("inputField");
const submit = document.getElementById("submit");
const inputField2 = document.getElementById("inputField2");
const submit2 = document.getElementById("submit2");
const resultsContainer = document.querySelector(".results");
const recipeContainer = document.querySelector(".recipe");

const itemContainer = document.querySelector(".item");

const numberOfResults = 9;

function submitField(evt) {
    resultsContainer.innerHTML = "";
    searchRecipe(inputField.value);
}

function submitField2(evt) {
    resultsContainer.innerHTML = "";
    searchRecipe(inputField2.value);
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
            <div class="image-box"><img src="` + result.results[i].image + `" alt="` + result.results[i].title + `"></div>
            <br>
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
    <style>
        .header {
            display: none;
        }
        .container2 {
            position: relative;
            width: 100%;
        }
    </style>

    <div class="recipe-container">
    <div class="col-1-1">
        <h1 class="title">` + recipe.title + `</h1>
        
        <div class="time-serv-container">
            <div class="clock-container">
                <img class="clock-icon" src="img/time-1.png">
                <p class="readyInMinutes"> ` + recipe.readyInMinutes + ` MIN</p>
            </div>
            <div class="serv-container">
                <img class="clock-icon" src="img/serv-1.png">
                <p class="servings"> ` + recipe.servings + ` SERVES</p>
            </div>
        </div>
        
    </div>
    <div class="col-2-1">
        <img class="image" src="` + recipe.image + `">
    </div>
    <div class="col-1-2">
        <div class="ingredients-card">
            <img class="ohje-icon" src="img/ingr.png">
            <h2 class="ingredients-steps-title">Ingredients</h2>
            `+ getIngredients(recipe) + `
        </div>
    </div>
    <div class="col-2-2" >
        <div class="steps-card">
             <img class="ohje-icon" src="img/ohje.png">
             <h2 id="steps" class="ingredients-steps-title">Directions</h2>
            <ol>
            `+ getInstructions(recipe) + `
            </ol>
        </div>
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

        //return ingredientAmount + " " + ingredient.measures["metric"].unitShort + " " + ingredient.name;
        return ingredientAmount + " " + ingredient.measures["metric"].unitShort + " " + `<p class='ingr-name'>` + ingredient.name + `</p>`;
    }

    return ingredient.originalString;
}

function getIngredients(recipe) {
    html = "";
    for (let i = 0; i < recipe.extendedIngredients.length; i++) {
        html += `<div class="unit-name-container"> <p class='ingr-unit'>` + unitConversion(recipe.extendedIngredients[i]) + `</p> </div>`;
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
submit2.addEventListener("click", submitField2);

document.getElementById("inputField")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit").click();
        }
    });

document.getElementById("inputField2")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit2").click();
        }
    });





/*let myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d49b963c9b1790102868fa8a468e6f9571619076712");

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const apiKey = "79edc81463084c748c02be93655d351f";
const inputField = document.getElementById("inputField");
const submit = document.getElementById("submit");
const resultsContainer = document.getElementById("results");

const numberOfResults = 9;

function submitField(evt) {
    resultsContainer.innerHTML = "";
    search(inputField.value);
}

function search(query) {
    fetch("https://api.spoonacular.com/recipes/complexSearch?query=" + query + "&number=" + numberOfResults + "&apiKey=" + apiKey, requestOptions)
        .then(response => response.json())
        .then(result => naytaTulokset(result))
        .catch(error => console.log('error', error));

}

function naytaTulokset(result) {

    console.log(result.totalResults);

    for (let i = 0; i < numberOfResults; i++) {
        resultsContainer.innerHTML +=
            `<div class="item">
            <div class="image-box"><img src="` + result.results[i].image + `" alt="` + result.results[i].title + `"></div>
            <br>
            <p>` + result.results[i].title + `</p>
            <br>
          </div>`;
    }
}

submit.addEventListener("click", submitField);*/











//test
/*const recipeContainer = document.getElementById("recipe-container");

function naytaReseptinTiedot(result) {
    // test
    recipeContainer.innerHTML +=
        `
            <h1 class="title">` + result.results[1003464].title + `</h1>
        `
}*/

/*const apiurl = "http://api.tvmaze.com/search/shows?q=";

let apiKysely;


const hakunappi = document.getElementById("hakunappi");
if (hakunappi == null) {
    console.log("Debug: hakunappia ei löytynyt")
} else {
    console.log("Debug: hakunappi löytyi!");
}
const hakuKentta = document.getElementById("hakuteksti");
const mainElement = document.querySelector("main");

hakunappi.addEventListener('click', teeKysely);

function teeKysely() {
    let hakusana = hakuKentta.value;

    apiKysely = apiurl + hakusana;
    console.log("Lähetettävä kysely: " + apiKysely);
    teeHaku(apiKysely);
}

function teeHaku(apiKysely)  {

    fetch(apiKysely).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);
    });
}

function naytaVastaus(jsonData) {

    let kuvanOsoite, altArvo, kuvaus, genre;

    if (jsonData.length == 0) {
        mainElement.innerHTML = `<h3>Annetulla haulla ei tuloksia.</h3>`;
    } else {
        mainElement.innerHTML = `<h3>Löytyneet hakutulokset:</h3>`;
    }

    for (let i = 0; i < jsonData.length; i++) {

        if (jsonData[i].show.summary != null) {
            kuvaus = jsonData[i].show.summary;
        } else {
            kuvaus = 'Description not found';
        }

        if (jsonData[i].show.summary != null) {
            genre = jsonData[i].show.genres;
        } else {
            genre = 'Genre details not found';
        }

        try {
            kuvanOsoite = jsonData[i].show.image.medium;
            altArvo = 'Haettu kuva';

        } catch (error) {
            kuvanOsoite = 'img/notFound.jpg';
            altArvo = 'Kuvaa ei löytynyt';

        }
        mainElement.innerHTML += `
        <article>
           
            <div class="picFormat">
            <h4>${jsonData[i].show.name}</h4>
                <img src="${kuvanOsoite}" alt="${altArvo}">
                <div class="description">${kuvaus}</div>
                <p>${genre}</p>
                <div>
                <a href="${jsonData[i].show.officialSite}"><p>Series Official Site</p></a>
                </div>
            </div>
            
        </article>`;
    }
}*/





