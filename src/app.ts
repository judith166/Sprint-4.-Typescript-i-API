document.addEventListener('DOMContentLoaded', () => {
    const jokeElement = document.getElementById('joke');
    const nextJokeButton = document.getElementById('nextJoke');

    if (jokeElement && nextJokeButton) {
        nextJokeButton.addEventListener('click', async () => {
            try {
                const response = await fetch('https://icanhazdadjoke.com/', {
                    headers: { Accept: 'application/json' },
                });
                const data = await response.json();
                jokeElement.textContent = data.joke;
            } catch (error) {
                console.error('Error fetching joke:', error);
            }
        });
    } else {
        console.error('Error: Elements not found.');
    }
});