let myHeaders = new Headers();
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

submit.addEventListener("click", submitField);


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





