//Score d'acudits
interface Joke {
  joke: string;
  score: number;
  date: string;
}

const reportAcudits: Joke[] = [];

function recordJoke(joke: string): void {
  const newJoke: Joke = {
    joke: joke,
    score: 0,
    date: new Date().toISOString(),
  };
  reportAcudits.push(newJoke);
  console.log("Joke recorded:", newJoke);
}

function updateScore(index: number, score: number): void {
  if (score >= 1 && score <= 3 && index >= 0 && index < reportAcudits.length) {
    reportAcudits[index].score = score;
    console.log("Score updated:", reportAcudits[index]);
  } else {
    console.log("Invalid index or score value.");
  }
}

// Definición de la función rateJoke en el ámbito global
(window as any).rateJoke = function (score: number): void {
  console.log("Joke rated with score:", score);
};

// Dentro de la función que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const jokeElement = document.getElementById("joke");
  const nextJokeButton = document.getElementById("nextJoke");

  if (jokeElement && nextJokeButton) {
    // Definir la función para obtener el siguiente chiste
    const getNextJoke = async () => {
      try {
        const response = await fetch("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        const data = await response.json();
        // Mostrar el chiste obtenido en el elemento HTML
        jokeElement.textContent = data.joke;
        // Registrar el chiste en el array reportAcudits
        recordJoke(data.joke);
        // Actualizar el score del chiste mostrado anteriormente (si existe)
        if (reportAcudits.length > 0) {
          // Suponiendo que el último chiste registrado es el que se muestra actualmente
          updateScore(reportAcudits.length - 1, -1);
        }
      } catch (error) {
        console.error("Error fetching joke:", error);
      }
    };

    // Agregar el evento onclick al botón para llamar a la función getNextJoke
    nextJokeButton.addEventListener("click", getNextJoke);
  } else {
    console.error("Error: Elements not found.");
  }

  // Función para mostrar el array reportAcudits en la consola
  function displayReport(): void {
    console.log("Reporte de Acudits:");
    reportAcudits.forEach((joke, index) => {
      console.log(`Chiste ${index + 1}:`);
      console.log("   - Chiste:", joke.joke);
      console.log("   - Score:", joke.score);
      console.log("   - Fecha:", joke.date);
    });
  }

  // Mostrar el reporte de acudits en la consola
  displayReport();
});
