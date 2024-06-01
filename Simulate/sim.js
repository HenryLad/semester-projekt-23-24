const url = "http://localhost:8000/teams";
document.addEventListener("DOMContentLoaded", () => {
    let isLoggedIn = localStorage.getItem('logIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = "../SignIn.html";
    }
    display_players();
    event.preventDefault();
    document.getElementById("addsquad").addEventListener("click", async function () {
        event.preventDefault();
        let squadname = document.getElementById("squadName").value;
        let playercount = document.getElementById("playerCount").value;
        let playercaptian = document.getElementById("playerCaptain").value;
        let squad = document.getElementById("card-body");
        if (parseInt(playercount) > 11 || parseInt(playercount) < 1) { alert("Please enter a valid number of players. Maximum 1 - 11 players are allowed"); return }
        let squadData = {
            name: squadname,
            playerCount: playercount,
            playerCaptain: playercaptian
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(squadData)
        })
        display_players();

    });


});

async function display_players() {
    let respone = await fetch(url);
    let data = await respone.json();
    let squad = document.getElementById("card-body");
    for (let result of data) {
        squad.innerHTML += `
       <div class="row">
           <div class="col-12" data-id="${result.id}">
               <div class="card">
                   <div class="card-header">
                       <h4 class="card-title">${result.name}</h4>
                       <button class="btn btn-danger delete-button">Delete</button>
                   </div>
                   <div class="card-body">
                       <p class="card-text">Number of Players: ${result.playerCount}</p>
                       <p class="card-text">Captain: ${result.playerCaptain}</p>
                       <p class="card-text" id="player-config"><a href="playerconfig.html">View & Modify Squad</a> </p>

                   </div>
               </div>
           </div>
       </div>
       `;
    }
    async function deleteTeam(id) {
        try {
            let response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                console.log(`Team with id ${id} deleted.`);
                display_players(); // Update the display after deletion
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", function (event) {
            let id = event.target.closest(".col-12").getAttribute("data-id");
            deleteTeam(id);
        });
    });
    document.getElementById("player-config").addEventListener("click", (event) => {
        let id = event.target.closest(".col-12").getAttribute("data-id");
        localStorage.setItem('current_id', id);
    });
}