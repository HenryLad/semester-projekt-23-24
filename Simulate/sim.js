
document.getElementById("addsquad").addEventListener("click", function () {
   event.preventDefault();
   let squadname = document.getElementById("squadName").value;
   let playercount = document.getElementById("playerCount").value;
   let playercaptian = document.getElementById("playerCaptain").value;
   let squad = document.getElementById("card-body");
   if(parseInt(playercount) > 11){alert("Please enter a valid number of players. Maximum 11 players are allowed"); return}
   squad.innerHTML += `
   <div class="row">
      <div class="col-12">
         <div class="card">
            <div class="card-header">
               <h4 class="card-title">${squadname}</h4>
            </div>
            <div class="card-body">
               <p class="card-text">Number of Players: ${playercount}</p>
               <p class="card-text">Captain: ${playercaptian}</p>
               <p class="card-text"><a href="playerconfig.html">View & Modify Squad</a> </p>
            </div>
         </div>
      </div>
   </div>
   `;

});
function addPlayer() {
   const playerName = document.getElementById('player-name').value;
   if (playerName.trim() === '') {
       alert('Please enter a player name');
       return;
   }
   const playerDiv = document.createElement('div');
   playerDiv.className = 'player';
   
   // Create a container for the player's name
   const playerNameDiv = document.createElement('div');
   playerNameDiv.className = 'player-name';
   playerNameDiv.textContent = playerName;
   
   playerDiv.appendChild(playerNameDiv);
   
   // Randomly position the player on the pitch
   const pitchWidth = document.querySelector('.football-pitch').clientWidth;
   const pitchHeight = document.querySelector('.football-pitch').clientHeight;
   const randomX = Math.floor(Math.random() * (pitchWidth - 100)); // Adjust for square size
   const randomY = Math.floor(Math.random() * (pitchHeight - 100)); // Adjust for square size
   playerDiv.style.left = randomX + 'px';
   playerDiv.style.top = randomY + 'px';
   
   // Append player to the pitch
   document.querySelector('.football-pitch').appendChild(playerDiv);
}

