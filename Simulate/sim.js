
document.getElementById("addsquad").addEventListener("click", function () {
   event.preventDefault();
   let squadname = document.getElementById("squadName").value;
   let playercount = document.getElementById("playerCount").value;
   let playercaptian = document.getElementById("playerCaptain").value;
   let squad = document.getElementById("card-body");

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
