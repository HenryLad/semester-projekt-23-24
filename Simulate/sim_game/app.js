/*
div class="container">
        <h1 class="text-center">Results</h1>
        
        <div class="result-card">
            <div class="result-header"></div>
            <div class="result-body">
                <div class="team">
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="ARS">
                    <span id="team-1"></span>
                </div>
                <div class="score" id="sel-score"></div>
                <div class="team">
                    <img src="https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg" alt="EVE">
                    <span id="team-2"></span>
                </div>
            </div>
        </div>
        
netural div container for results*/
const url_teams = "http://localhost:8000/teams";
const url_scores = "http://localhost:8000/scores";
document.addEventListener('DOMContentLoaded', () => {
    init_teams();
    display_score();
});

async function init_teams() {
    const response_team = await fetch(url_teams);
    let data_team = await response_team.json();
    const team_1 = document.getElementById('team_1');
    const team_2 = document.getElementById('team_2');

    for (let data of data_team) {
        team_1.innerHTML += `
               <option value="${data.id}">${data.name}</option>      
               `;
        team_2.innerHTML += `
               <option value="${data.id}">${data.name}</option>      
               `
    }
    let select1 = document.getElementById('score_1');
    let select2 = document.getElementById('score_2');

    for (let i = 0; i < 13; i++) {
        select1.innerHTML += `
              <option value="${i}">${i}</option>      
              `;
        select2.innerHTML += `
              <option value="${i}">${i}</option>      
              `
    }
}

document.getElementById('save-btn').addEventListener('click', () => {
    let select1 = document.getElementById('score_1');
    let select2 = document.getElementById('score_2');
    const team_1 = document.getElementById('team_1');
    const team_2 = document.getElementById('team_2');

    let selectedValue1 = select1.value;
    let selectedValue2 = select2.value;

    let selectedText1 = team_1.options[team_1.selectedIndex].text;
    let selectedText2 = team_2.options[team_2.selectedIndex].text;

    if (selectedText1 === selectedText2) { alert("Teams cannot be the same"); return; }


    let resultdiv = document.getElementById('result-div');
    let currentDateTime = new Date();
    let options = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
    let formattedDateTime = currentDateTime.toLocaleString('de-DE', options);
    let data = {
        team_1: selectedText1,
        team_2: selectedText2,
        score: `${selectedValue1} : ${selectedValue2}`,
        date: formattedDateTime
    };
    addScore(data);

});

document.getElementById('randomResultBtn').addEventListener('click', () => {
    let select1 = document.getElementById('score_1');
    let select2 = document.getElementById('score_2');
    const team_1 = document.getElementById('team_1');
    const team_2 = document.getElementById('team_2');


    let selectedValue1 = Math.floor(Math.random() * 13);
    let selectedValue2 = Math.floor(Math.random() * 13);

    let selectedText1 = team_1.options[team_1.selectedIndex].text;
    let selectedText2 = team_2.options[team_2.selectedIndex].text;

    if (selectedText1 === selectedText2) { alert("Teams cannot be the same"); return; }

    let resultdiv = document.getElementById('result-div');
    let currentDateTime = new Date();
    let options = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
    let formattedDateTime = currentDateTime.toLocaleString('de-DE', options);
    let data = {
        team_1: selectedText1,
        team_2: selectedText2,
        score: `${selectedValue1} : ${selectedValue2}`,
        date: formattedDateTime
    };
    addScore(data);


});

async function display_score() {
    const response = await fetch(url_scores);
    let data = await response.json();
    let resultdiv = document.getElementById('result-div');
    let html = '';
    for (let opt of data) {
        html += `
        <div class="container">
            <div class="result-card">
                <div class="result-header">${opt.date}</div>
                <div class="result-body">
                    <div class="team">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="ARS">
                        <span class="team-1">${opt.team_1}</span>
                    </div>
                    <div class="score" class="sel-score">${opt.score}</div>
                    <div class="team">
                        <img src="https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg" alt="EVE">
                        <span class="team-2">${opt.team_2}</span>
                    </div>
                </div>
                <button type="button" class="btn btn-danger del-btn" data-id="${opt.id}">Delete</button>
            </div>
        </div>
        `;
    }
    resultdiv.innerHTML = html;


    resultdiv.addEventListener('click', function (event) {

        if (event.target.classList.contains('del-btn')) {
            let id = event.target.getAttribute('data-id');
            deleteScore(id);
        }
    });
}

async function deleteScore(id) {

    try {
        let response = await fetch(`${url_scores}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            display_score();
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addScore(data) {
    try {
        let response = await fetch(url_scores, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            display_score();
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
document.getElementById('go-back').addEventListener('click', () => {
    window.location.href = "../simulate.html";
});
document.getElementById('clear-btn').addEventListener('click', async () => {
    let resultdiv = document.getElementById('result-div');
    // Task use fetch to delete all scores from json server
    const response = await fetch(url_scores);
    let data = await response.json();
    for (let opt of data) {
        deleteScore(opt.id);
    }
});
