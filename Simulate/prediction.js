const matchesUrl = 'http://localhost:8000/matches'
const predictionsUrl = 'http://localhost:8000/predictions'
let matchName = '';
let count = 0;
const predictionCount = {};

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

async function storePrediction(matchId, prediction, count) {
    const response = await fetch(predictionsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: matchId,
            prediction: prediction,
            count: count
        }),
    });

    return response.ok;
}

async function updatePrediction(matchId, prediction, count) {
    const response = await fetch(predictionsUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: matchId,
            prediction: prediction,
            count: count
        }),
    });

    return response.ok;
}


async function displayPopularPredictions() {

    const response = await fetch(predictionsUrl);
    const predictions = await response.json();


    for (const prediction of predictions) {
        const matchId = prediction.matchId;
        const pred = prediction.prediction;
        if (!predictionCount[matchId]) {
            predictionCount[matchId] = {};
        }
        if (!predictionCount[matchId][pred]) {
            predictionCount[matchId][pred] = 0;
        }
        predictionCount[matchId][pred] += 1;
    }

    for (const matchId in predictionCount) {
        const matchPredictions = predictionCount[matchId];
        const sortedPredictions = Object.keys(matchPredictions).sort((a, b) => matchPredictions[b] - matchPredictions[a]);

        const matchElement = document.createElement('div');
        matchElement.className = 'match-predictions';
        matchElement.innerHTML = `<h4>Match: ${matchName}</h4>`;

        for (const pred of sortedPredictions) {
            const predElement = document.createElement('p');
            predElement.textContent = `${pred}: ${matchPredictions[pred]} votes`;
            matchElement.appendChild(predElement);
        }

        popularPredictions.appendChild(matchElement);
    }
}


async function clearPredictions() {
    await fetch(predictionsUrl, {
        method: 'DELETE',
    });

    popularPredictions.innerHTML = '';
    predictionCount = {};
}

document.getElementById('submitPrediction').addEventListener('click', (event) => {
    event.preventDefault();
    count++;
    const matchId = matchSelect.value;
    const prediction = document.getElementById('prediction').value;
    if (count === 0) {
        storePrediction(matchId, prediction, count);
    }
    else {
        updatePrediction(matchId, prediction, count);
    }
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