let players = [];
const url = "http://localhost:8000/teams";
document.getElementById('playerForm').addEventListener('submit', async function(e) {
   e.preventDefault();

   var number = document.getElementById('cfg_number').value;
   var name = document.getElementById('cfg_name').value;
   if(players.includes(number)){alert("Number already in use. Please choose an other one")}
   else{players.push(number)}
   
   
      
   var playerDiv = document.createElement('div');
   playerDiv.classList.add('player-div');
   playerDiv.textContent = 'Player ' + number + ': ' + name;

   document.getElementById('body_player_add').appendChild(playerDiv);
});
async function display_addedPlayers(id)
{
   let respone = await fetch(url);
   let data = await respone.json();
   for(let team of data)
      {
      var playerDiv = document.createElement('div');
      playerDiv.classList.add('player-div');
      playerDiv.textContent = 'Player ' + data.playercaptain + ': ' + data.playerCount;
      }

}

addEventListener('DOMContentLoaded', () =>{
      display_addedPlayers();
   })