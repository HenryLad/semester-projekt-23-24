let players = [];
let randomPlayer;
let attempts = 8;

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/players')
        .then(response => response.json())
        .then(data => {
            players = data;
            randomPlayer = players[Math.floor(Math.random() * players.length)];
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

    const checkIcon = (condition) => condition ? '<i class="fas fa-check-circle" style="color: green;"></i>' : '<i class="fas fa-times-circle" style="color: red;"></i>';

    const guessedPlayerDiv = document.createElement('div');
    guessedPlayerDiv.innerHTML = `
        <p><strong>${guessedPlayer.name}</strong></p>
        <div class="player-attributes">
            <span class="attribute ${guessedPlayer.nationality === randomPlayer.nationality ? 'correct' : 'incorrect'}">
                <i class="fas fa-flag"></i> <img src="https://countryflagsapi.com/png/${guessedPlayer.nationality}" alt="${guessedPlayer.nationality}" class="flag-icon">
            </span>
            <span class="attribute ${guessedPlayer.age === randomPlayer.age ? 'correct' : 'incorrect'}">
                <i class="fas fa-birthday-cake"></i> ${guessedPlayer.age > randomPlayer.age ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>'}
            </span>
            <span class="attribute ${guessedPlayer.position === randomPlayer.position ? 'correct' : 'incorrect'}">
                <i class="fas fa-futbol"></i> ${guessedPlayer.position}
            </span>
            <span class="attribute ${guessedPlayer.league === randomPlayer.league ? 'correct' : 'incorrect'}">
                <i class="fas fa-trophy"></i> ${guessedPlayer.league}
            </span>
            <span class="attribute ${guessedPlayer.club === randomPlayer.club ? 'correct' : 'incorrect'}">
                <i class="fas fa-shield-alt"></i> <img src="${guessedPlayer.clubLogo}" alt="${guessedPlayer.club}" class="club-logo">
            </span>
        </div>
        <hr>
    `;
    guessedPlayersDiv.appendChild(guessedPlayerDiv);

    document.getElementById('guessInput').value = '';
});