let players = [];
let randomPlayer;
let attempts = 8;

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/players')
        .then(response => response.json())
        .then(data => {
            players = data;
            generateRandomPlayer();
            document.getElementById('guessButton').disabled = false;

            $("#guessInput").autocomplete({
                source: function(request, response) {
                    const results = $.ui.autocomplete.filter(players.map(p => p.name), request.term);
                    response(results.slice(0, 10));
                },
                minLength: 1
            });
        })
        .catch(error => console.error('Error fetching player data:', error));
});

document.getElementById('guessButton').addEventListener('click', () => {
    const guessInput = document.getElementById('guessInput').value.trim();
    const feedback = document.getElementById('feedback');
    const attemptsRemaining = document.getElementById('attemptsRemaining');
    const guessedPlayersDiv = document.getElementById('guessedPlayers');

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

    if (guessedPlayer.name.toLowerCase() === randomPlayer.name.toLowerCase()) {
        feedback.innerHTML = `Congratulations! You've guessed the correct player: ${randomPlayer.name}.`;
        document.getElementById('guessButton').disabled = true;
    } else if (attempts === 0) {
        feedback.innerHTML = `You've run out of attempts! The correct player was ${randomPlayer.name}.`;
        document.getElementById('guessButton').disabled = true;
    } else {
        feedback.innerHTML = '';
    }

    attemptsRemaining.textContent = `Attempts remaining: ${attempts}`;

    const ageDifference = guessedPlayer.age - randomPlayer.age;
    const ageArrow = ageDifference > 0 ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>';
    const ageClass = guessedPlayer.age === randomPlayer.age ? 'correct' : 'incorrect';

    const guessedPlayerDiv = document.createElement('div');
    guessedPlayerDiv.innerHTML = `
        <p><strong>${guessedPlayer.name}</strong></p>
        <div class="player-attributes">
            <span class="attribute ${guessedPlayer.nationality === randomPlayer.nationality ? 'correct' : 'incorrect'}">
                <img src="${guessedPlayer.nationality}" alt="${guessedPlayer.nationality}" class="flag-icon">
            </span>
            <span class="attribute ${ageClass}">
                ${guessedPlayer.age} ${ageArrow}
            </span>
            <span class="attribute ${guessedPlayer.position === randomPlayer.position ? 'correct' : 'incorrect'}">
                ${guessedPlayer.position}
            </span>
            <span class="attribute ${guessedPlayer.league === randomPlayer.league ? 'correct' : 'incorrect'}">
                <img class="league-logo" src="${guessedPlayer.league}" />
            </span>
            <span class="attribute ${guessedPlayer.club === randomPlayer.club ? 'correct' : 'incorrect'}">
                <img src="${guessedPlayer.club}" alt="${guessedPlayer.club}" class="club-logo">
            </span>
        </div>
        <hr>
    `;

    guessedPlayersDiv.prepend(guessedPlayerDiv); 

    document.getElementById('guessInput').value = '';
});

document.getElementById('retryButton').addEventListener('click', () => {
    attempts = 8;
    document.getElementById('guessButton').disabled = false;
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('attemptsRemaining').textContent = `Attempts remaining: ${attempts}`;
    document.getElementById('guessedPlayers').innerHTML = '';
    document.getElementById('guessInput').value = '';
    generateRandomPlayer();
});

function generateRandomPlayer() {
    randomPlayer = players[Math.floor(Math.random() * players.length)];
    console.log('Random player:', randomPlayer);
}
