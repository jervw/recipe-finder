const apiurl = "http://api.tvmaze.com/search/shows?q=";

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
}





