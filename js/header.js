const images = [
    'url("img/mansikat-header.jpg")',
    'url("img/pitaleipa-header.jpg")',
]
const headerDiv = document.getElementById("header");
var currentImage = 0;

function changeBackground() {
    bg = images[currentImage = ++currentImage % images.length];
    headerDiv.style.backgroundImage = bg;
}
setInterval(changeBackground, 10000);