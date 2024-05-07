document.addEventListener("DOMContentLoaded", () => {
   let isLoggedIn = localStorage.getItem('logIn') === 'true';
// At the beginning of the file
if (!isLoggedIn) {
    window.location.href = "../SignIn.html";
}
})
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

let players = [];
function addPlayer() {
   var number = document.getElementById("cfg_number").value;
   var name = document.getElementById("cfg_name").value;
   let squad = document.getElementById("body_player_add");
   let playercount = document.getElementById("playerCount").value;

   if(number == "" || name == "") {
      alert("Please enter a valid number and name");
      return;
   }
   if(players.length >= playercount){
      alert("You have reached the maximum number of players");
      return;
   }
   if(players.find(player => player.number == number)){
      alert("Player number already exists");
      return;
   }

   squad.innerHTML += `
   <div class="row">
      <div class="col-12">
         <div class="card">
            <div class="card-body">
               <p class="card-text"> Name: ${name} Number: ${number}</p>
            </div>
         </div>
      </div>
     `;
}

document.getElementById("btn_player_submit").addEventListener("click",  addPlayer());
