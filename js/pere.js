let map;
let resultsArray;

const mainElement = document.getElementById('map-results-container');

function initMap() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

//Location of Karamalmi campus. Will be used if no user geolocation data is available
    let location = {
        lat: 60.224,
        lng: 24.758
    }

    let location2 = {
        lat: 60.223,
        lng: 24.689
    }

    //Trying to get user geolocation data. If successful, user geolocation data wil be used to center the map and find restaurants
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

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 60.224,
            lng: 24.758
        },
        zoom: 16
    });

    directionsDisplay.setMap(map);

    let onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);

    let options = {
        center: location,
        types: ['restaurant', 'cafe', 'bar'],
        zoom: 16

    }
    let request = {
        location: location,
        radius: 8000,
        types: ['restaurant', 'cafe', 'bar',]

    }

    let service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    for (let i = 0; i < results.length; i++) {
        console.log(results[i].address);
    }
}

function callback(results, status) {
    resultsArray = results;
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results.length);
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].name);
            createMarker(results[i]);
        }
    }
    console.log(resultsArray[0]);
    displayRestaurants();
    calculateAndDisplayRoute();
}

function createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: resultsArray[4],                 //document.getElementById('start').value,
        destination: resultsArray[2],           //document.getElementById('end').value,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed: ' + status);
        }
    });
}

function displayRestaurants() {

    for (let i = 0; i < resultsArray.length; i++) {

        if (resultsArray[i].name != null) {
            kuvaus = resultsArray[i].name;
        } else {
            kuvaus = 'Description not found';
        }

        if (resultsArray[i].formatted_address != null) {
            address = resultsArray[i].formatted_address;
        } else {
            address = 'Address details not found';
        }

        try {
            kuvanOsoite = resultsArray[i].photos[0];
            altArvo = 'Haettu kuva';

        } catch (error) {
            /*kuvanOsoite = 'img/notFound.jpg';*/
            altArvo = 'Kuvaa ei löytynyt';

        }
        mainElement.innerHTML += `
        <article class="ravintolat-item">
           
            <h4 class="ravintolan-nimi">${resultsArray[i].name}</h4>
            <p class="rating">${resultsArray[i].vicinity}</p>
            <p class="rating">Rating: ${resultsArray[i].rating}</p>
        </article>`;
    }
}