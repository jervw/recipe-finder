let myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d49b963c9b1790102868fa8a468e6f9571619076712");

let requestOptions = {
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
const resultsContainer = document.getElementById("results");

const numberOfResults = 9;


function submitField(evt) {
    resultsContainer.innerHTML = "";
    search(inputField.value);
}

function search(query) {
    fetch("https://api.spoonacular.com/recipes/complexSearch?query=" + query + "&number=" + numberOfResults + "&apiKey=" + apiKey2, requestOptions)
        .then(response => response.json())
        .then(result => naytaTulokset(result))
        .catch(error => console.log('error', error));

}

function naytaTulokset(result) {

    console.log(result.totalResults);

    for (let i = 0; i < numberOfResults; i++) {
        resultsContainer.innerHTML +=
            `<div class="item">
            <img src="` + result.results[i].image + `" alt="` + result.results[i].title + `">
            <p>` + result.results[i].title + `</p>
            <br>
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

submit.addEventListener("click", submitField);

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





