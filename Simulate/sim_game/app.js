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
document.addEventListener('DOMContentLoaded', () => {
    init_teams();
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

    for (let i = 0; i < 100; i++) {
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

    let resultdiv = document.getElementById('result-div');
    let currentDateTime = new Date();
    resultdiv.innerHTML += `
    <div class="container">
        
        <div class="result-card">
            <div class="result-header">${currentDateTime}</div>
            <div class="result-body">
                <div class="team">
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="ARS">
                    <span id="team-1">${selectedText1}</span>
                </div>
                <div class="score" id="sel-score">${selectedValue1} : ${selectedValue2}</div>
                <div class="team">
                    <img src="https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg" alt="EVE">
                    <span id="team-2">${selectedText1}</span>
                </div>
            </div>
        </div>
    
    `

});