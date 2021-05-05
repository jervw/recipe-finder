
const inputField = document.getElementById("inputField");
const submit = document.getElementById("submit");
const resultsContainer = document.getElementById("results");

var imgsrc = "http://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" + 1 + "|00FF00|000000&.png";
var pinimg = new google.maps.MarkerImage(imgsrc);


//Places related code

let map;
let marker;

function initMap() {
    let userLocation = {
        lat: 60.224,
        lng: 24.758
    }
    let options = {
        center: userLocation,
        radius: 8000,
        types: ['restaurant','cafe'],
        zoom: 16
    }
    let request = {
        location: userLocation,
        radius: 8000,
        types: ['restaurant', 'cafe']
    }


    if (navigator.geolocation) {
        console.log('geolocation info received');

        navigator.geolocation.getCurrentPosition((loc) => {

                userLocation.lat = loc.coords.latitude;
                userLocation.lng = loc.coords.longitude;


                map = new google.maps.places.PlacesService(document.getElementById("map"), options);

                addMarker(userLocation);

                map.setOptions({ styles: styles["hide"] });

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

function addMarker() {
    marker = new google.maps.Marker({
        position: userLocation,
        map: map,
        icon: pinimg,
    });
}
const styles = {
    default: [],
    hide: [
        {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
    ],
};
submit.addEventListener("click", submitField);

/*function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('inputField'),
        {
            types: ['restaurant', 'cafe', 'establishment'],
            componentRestrinctions: {'country': ['FI']},
            fields: ['place_id', 'geometry', 'name']
        });
        }
*/
document.getElementById("inputField")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit").click();
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



