// Changing background images of header
const images = [
    'url("img/mansikat.png")',
    'url("img/pitaleipa.png")',
]
const headerDiv = document.getElementById("header");
var currentImage = 0;

function changeBackground() {
    bg = images[currentImage = ++currentImage % images.length];
    headerDiv.style.backgroundImage = bg;
}
setInterval(changeBackground, 10000);