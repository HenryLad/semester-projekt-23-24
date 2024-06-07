const matchesUrl = 'http://localhost:8000/matches'
let matchName = '';

const matchSelect = document.getElementById('match-select');
const predictionForm = document.getElementById('predictor');
const popularPredictions = document.getElementById('predictions');

async function fetchMatches() {
    const response = await fetch(matchesUrl);
    const matches = await response.json();
    for (const match of matches) {
        const team1 = match.team1;
        const team2 = match.team2;
        const matchDate = match.date;
        const matchId = match.id;
        matchName = `${team1} vs ${team2} (${matchDate})`;
        matchSelect.innerHTML += `<option value="${matchId}">${matchName}</option>`;
    }
}

async function storePrediction(matchId, prediction) {
    const response = await fetch(`${matchesUrl}/${matchId}`);
    if (!response.ok) {
        alert("Failed to fetch the match data. Please select a match and try again.");
        return false;
    }
    const match = await response.json();

    const existingPrediction = match.predictions.find(p => p.prediction === prediction);
    if (existingPrediction) {
        existingPrediction.votes += 1;
    } else {
        const newPrediction = {
            prediction: prediction,
            votes: 1
        };
        match.predictions.push(newPrediction);
    }

    const updateResponse = await fetch(`${matchesUrl}/${matchId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            predictions: match.predictions
        }),
    });

    return updateResponse.ok;
}

async function displayPopularPredictions() {
    const response = await fetch(matchesUrl);
    const matches = await response.json();

    popularPredictions.innerHTML = '';

    for (const match of matches) {
        const predictions = match.predictions;
        const matchName = `${match.team1} vs ${match.team2} (${match.date})`;
        for (const prediction of predictions) {
            popularPredictions.innerHTML += `<li><h5>Match: ${matchName}</h5> Prediction: ${prediction.prediction} (Votes: ${prediction.votes})</li>`;
        }
    }
}

async function clearPredictions() {
    const response = await fetch(matchesUrl);
    const matches = await response.json();

    for (const match of matches) {
        await fetch(`${matchesUrl}/${match.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                predictions: []
            }),
        });
    }

    popularPredictions.innerHTML = '';
}

document.getElementById('submitPrediction').addEventListener('click', (event) => {
    event.preventDefault();
    const matchId = matchSelect.value;
    const prediction = document.getElementById('prediction').value;
    const predictionRegex = /^\d+-\d+$/;
    if (!prediction.match(predictionRegex)) {
        alert("Invalid prediction format. Please enter a prediction in the format 'score - score'.");
        return;
    }
    storePrediction(matchId, prediction).then(success => {
        if (success) {
            displayPopularPredictions();
        }
    });
});

document.getElementById('clearPredictions').addEventListener('click', (event) => {
    event.preventDefault();
    clearPredictions();
});

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    fetchMatches();
    displayPopularPredictions();
});