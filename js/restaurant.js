let myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d49b963c9b1790102868fa8a468e6f9571619076712");

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const apiKey = "js/key.js.key";

const inputField = document.getElementById("inputField");
const submit = document.getElementById("submit");
const resultsContainer = document.getElementById("results");

const numberOfResults = 9;


function submitField(evt) {
    resultsContainer.innerHTML = "";
    search(inputField.value);
}
/*
function search(query) {
    fetch("https://maps.googleapis.com/maps/api/js?key="+ apiKey + "=initMap", requestOptions)
        .then(response => response.json())
        .then(result => naytaTulokset(result))
        .catch(error => console.log('error', error));

}
*/
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
    let location = {
        lat: 60.224,
        lng: 24.758
    }
    let options = {
        center: location,
        zoom: 16
    }
    if (navigator.geolocation) {
        console.log('geolocation info received');

        navigator.geolocation.getCurrentPosition((loc) => {

            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;

            map = new google.maps.Map(document.getElementById("map"), options);
        },
            (err) => {
            console.log('Denied access to user location.');

            map = new google.maps.Map(document.getElementById("map"), options);
            }
        )
    } else {
        console.log('geolocation not supported');

        map = new google.maps.Map(document.getElementById("map"), options);
    }

}

submit.addEventListener("click", submitField);

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





