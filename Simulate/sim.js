const url = "http://localhost:8000/teams";

document.addEventListener("DOMContentLoaded", () => {
    let isLoggedIn = localStorage.getItem('logIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = "../SignIn.html";
    }

    display_players();

    document.getElementById("addsquad").addEventListener("click", async function (event) {
        event.preventDefault();
        let squadname = document.getElementById("squadName").value;
        let playercount = document.getElementById("playerCount").value;
        let playercaptian = document.getElementById("playerCaptain").value;

        if (parseInt(playercount) > 11 || parseInt(playercount) < 1) { 
            alert("Please enter a valid number of players. Maximum 1 - 11 players are allowed"); 
            return; 
        }

        let squadData = {
            name: squadname,
            playerCount: playercount,
            playerCaptain: playercaptian,
            players: []
        };

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(squadData)
        });

        if (response.ok) {
            display_players();
        } else {
            console.error('Error:', response.statusText);
        }
    });
});

async function display_players() {
    let response = await fetch(url);
    let data = await response.json();
    let squad = document.getElementById("card-body");
    squad.innerHTML = ""; // Clear existing content

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
                            <p class="card-text player-config"><a href="playerconfig.html">View & Modify Squad</a></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let id = event.target.closest(".col-12").getAttribute("data-id");
            deleteTeam(id);
        });
    });

    document.querySelectorAll(".player-config").forEach(configLink => {
        configLink.addEventListener("click", function (event) {
            let id = event.target.closest(".col-12").getAttribute("data-id");
            localStorage.setItem('current_id', id);
        });
    });
}

async function deleteTeam(id) {
    try {
        let response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

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
