"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const reportAcudits = [];
function recordJoke(joke) {
    const newJoke = {
        joke: joke,
        score: 0,
        date: new Date().toISOString(),
    };
    reportAcudits.push(newJoke);
    console.log("Joke recorded:", newJoke);
}
function updateScore(index, score) {
    if (score >= 1 && score <= 3 && index >= 0 && index < reportAcudits.length) {
        reportAcudits[index].score = score;
        console.log("Score updated:", reportAcudits[index]);
    }
    else {
        console.log("Invalid index or score value.");
    }
}
window.rateJoke = function (score) {
    console.log("Joke rated with score:", score);
};
document.addEventListener("DOMContentLoaded", () => {
    const jokeElement = document.getElementById("joke");
    const nextJokeButton = document.getElementById("nextJoke");
    if (jokeElement && nextJokeButton) {
        const getNextJoke = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch("https://icanhazdadjoke.com/", {
                    headers: { Accept: "application/json" },
                });
                const data = yield response.json();
                jokeElement.textContent = data.joke;
                recordJoke(data.joke);
                if (reportAcudits.length > 0) {
                    updateScore(reportAcudits.length - 1, -1);
                }
            }
            catch (error) {
                console.error("Error fetching joke:", error);
            }
        });
        nextJokeButton.addEventListener("click", getNextJoke);
    }
    else {
        console.error("Error: Elements not found.");
    }
    function displayReport() {
        console.log("Reporte de Acudits:");
        reportAcudits.forEach((joke, index) => {
            console.log(`Chiste ${index + 1}:`);
            console.log("   - Chiste:", joke.joke);
            console.log("   - Score:", joke.score);
            console.log("   - Fecha:", joke.date);
        });
    }
    displayReport();
});
