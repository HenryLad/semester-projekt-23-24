
let players = [];
let randomPlayer;
let attempts = 8;

document.addEventListener('DOMContentLoaded', () => {
    fetch('') 
        .then(response => response.json())
        .then(data => {
            players = data;
            randomPlayer = players[Math.floor(Math.random() * players.length)];
            document.getElementById('guessButton').disabled = false;
        })
        .catch(error => console.error('Error fetching player data:', error));
});

document.getElementById('guessButton').addEventListener('click', () => {
    const guessInput = document.getElementById('guessInput').value.trim();
    const feedback = document.getElementById('feedback');
    const attemptsRemaining = document.getElementById('attemptsRemaining');

    if (!guessInput) {
        feedback.textContent = "Please enter a player's name.";
        return;
    }

    const guessedPlayer = players.find(player => player.name.toLowerCase() === guessInput.toLowerCase());

    if (!guessedPlayer) {
        feedback.textContent = "Player not found in the database.";
        return;
    }

    attempts--;

    let feedbackText = '';
    feedbackText += `Nationality: ${guessedPlayer.nationality === randomPlayer.nationality ? 'Correct' : 'Incorrect'}<br>`;
    feedbackText += `Age: ${guessedPlayer.age === randomPlayer.age ? 'Correct' : 'Incorrect'}<br>`;
    feedbackText += `Position: ${guessedPlayer.position === randomPlayer.position ? 'Correct' : 'Incorrect'}<br>`;
    feedbackText += `League: ${guessedPlayer.league === randomPlayer.league ? 'Correct' : 'Incorrect'}<br>`;
    feedbackText += `Club: ${guessedPlayer.club === randomPlayer.club ? 'Correct' : 'Incorrect'}`;

    if (guessedPlayer.name.toLowerCase() === randomPlayer.name.toLowerCase()) {
        feedbackText = `Congratulations! You've guessed the correct player: ${randomPlayer.name}.`;
    } else if (attempts === 0) {
        feedbackText += `<br>You've run out of attempts! The correct player was ${randomPlayer.name}.`;
    }

    feedback.innerHTML = feedbackText;
    attemptsRemaining.textContent = `Attempts remaining: ${attempts}`;

    if (attempts === 0 || guessedPlayer.name.toLowerCase() === randomPlayer.name.toLowerCase()) {
        document.getElementById('guessButton').disabled = true;
    }
});
