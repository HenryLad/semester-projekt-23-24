let players_number = [];
let players = [];
const url = "http://localhost:8000/teams";

document.getElementById('btn_player_submit').addEventListener('click', async function(event) {
   event.preventDefault();
   
   let response = await fetch(url);
   let data = await response.json();
   let team = data.find(team => team.id == localStorage.getItem('current_id'));
   
   var number = document.getElementById('cfg_number').value;
   var name = document.getElementById('cfg_name').value;
   let id = localStorage.getItem('current_id');

   if (team.playerCount < players_number.length + 1) {
      alert("Too many players. Please choose another team");
      return;
   }

   if (players_number.includes(number)) {
      alert("Number already in use. Please choose another one");
      return;
   } else {
      players_number.push(number); 
      players.push({number: number, name: name});

      // Add the new player to the team's players array
      team.players.push({number: number, name: name});

      // Send a PUT request to the server with the updated team data
      let putResponse = await fetch(`${url}/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(team)
      });

      if (!putResponse.ok) {
         alert('Error updating team');
         return;
      }

      let putResult = await putResponse.json();
      alert(putResult);
   }

   var playerDiv = document.createElement('div');
   playerDiv.classList.add('player-div');
   playerDiv.textContent = 'Player ' + number + ': ' + name;
   document.getElementById('body_player_add').appendChild(playerDiv);
});

function display_player()
{
   let players = getPlayers(localStorage.getItem('current_id'));
   console.log(players);
}

async function getPlayers(teamId) {
   // Fetch the data from the server
   let response = await fetch(url);
   let data = await response.json();

   // Find the team with the specified id
   let team = data.find(team => team.id === teamId);

   // Return the players of the team
   return team ? team.players : [];
}

addEventListener('DOMContentLoaded', display_player());