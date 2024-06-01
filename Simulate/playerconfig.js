let players_number = [];
let players = [];
const url = "http://localhost:8000/teams";

document.getElementById('btn_player_submit').addEventListener('click', async function (event) {
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
      players.push({ number: number, name: name });

      // Add the new player to the team's players array
      team.players.push({ number: number, name: name });

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
      console.log(putResult);

      // Refresh the player list to reflect the updated data from the server
      await display_player();
   }
});

async function display_player() {
   // Clear the existing player list in the DOM
   let elements = document.getElementsByClassName('player-div');
   while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
   }

   // Fetch the updated player data from the server
   let playersData = await getPlayers(localStorage.getItem('current_id'));
   players_number = playersData.map(player => player.number);
   players = playersData;

   // Populate the DOM with the updated player list
   for (let i = 0; i < playersData.length; i++) {
      var playerDiv = document.createElement('div');
      playerDiv.classList.add('player-div');
      playerDiv.textContent = 'Player ' + playersData[i].number + ': ' + playersData[i].name;
  
      // Create a button, set its id, and append it to the playerDiv
      var deleteButton = document.createElement('button');
      deleteButton.id = 'btn-delete';
      deleteButton.classList.add('btn-delete', 'btn', 'btn-danger');
      deleteButton.textContent = 'Delete';
      playerDiv.appendChild(deleteButton);
  
      document.getElementById('body_player_add').appendChild(playerDiv);
  }
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

document.addEventListener('DOMContentLoaded', display_player);
