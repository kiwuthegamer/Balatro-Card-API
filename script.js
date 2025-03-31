function getUrlParameter(name) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    return urlParams.get(name)
}

function randomOption(list) { return list[Math.floor(Math.random() * list.length)] }

function random(min, max, exclude = []) {
    let num;
    do {
        // num = Math.floor(Math.random() * (max - min + 1) + min);
        
        // Calculate psuedorandom number based on time
        var d = new Date();
        num = d.getTime() % (max - min + 1) + min;
    } while (exclude.includes(num));
    return num;
}

var jokers = parseInt(getUrlParameter("jokers"));
var cards = parseInt(getUrlParameter("cards"));
var specialCases = parseInt(getUrlParameter("specialCases"));
var basicOnly = parseInt(getUrlParameter("basicOnly"));

var imgSRC = "Card Art/"

var options = []
if (jokers) { options.push("Jokers/") }
if (cards) { options.push("Cards/") }

option = randomOption(options);
imgSRC += option

if (option == "Cards/") {
    options = ["BASIC", "BONUS", "GLASS", "GOLD", "LUCKY", "MULT", "STEEL", "WILD"];
    
    option = "BASIC";
    if (!basicOnly) {
        option = randomOption(options);
    }
    imgSRC += option;

    var randomIndex = random(1, 52);
    imgSRC += `/${randomIndex}.png`;
}

if (option == "Jokers/") {
    if (specialCases) {
        var randomIndex = random(1, 155, exclude=[84, 85, 86, 87, 88, 91, 92, 93, 94, 95]);
    } else {
        var randomIndex = random(1, 155, exclude=[8, 25, 28, 32, 36, 42, 70, 72, 74, 78, 84, 85, 86, 87, 88, 91, 92, 93, 94, 95, 110, 121, 128]);
    }
    imgSRC += `${randomIndex}.png`;
}

document.write(`<img src='${imgSRC}'>`);
