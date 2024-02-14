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
document.addEventListener('DOMContentLoaded', () => {
    const jokeElement = document.getElementById('joke');
    const nextJokeButton = document.getElementById('nextJoke');
    if (jokeElement && nextJokeButton) {
        nextJokeButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://icanhazdadjoke.com/', {
                    headers: { Accept: 'application/json' },
                });
                const data = yield response.json();
                jokeElement.textContent = data.joke;
            }
            catch (error) {
                console.error('Error fetching joke:', error);
            }
        }));
    }
    else {
        console.error('Error: Elements not found.');
    }
});
