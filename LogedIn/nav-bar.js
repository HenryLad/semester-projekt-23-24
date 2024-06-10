document.addEventListener("DOMContentLoaded", checkLogin(), init());
function checkLogin()
{
   let isLoggedIn = localStorage.getItem('logIn') === 'true';
   // At the beginning of the file
   if (!isLoggedIn) {
       window.location.href = "../SignIn.html";
   }
}
function init()
{
    document.getElementById("nav-bar-dynamicly").innerHTML = `
     <div class="container-fluid">
            <a class="navbar-brand" href="../index.html">Football Manager</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../Simulate/simulate.html">Simulate Game</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../guessTheFootballer/index.html">Guess the Footballer</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../Simulate/prediction.html">Match Predictor</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item" id="btn-sign-in">
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle nav-link-sign style-dropdown-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="btn-profile">
                              
                            </button>
                            <ul class="dropdown-menu">
                              <li><a href="../myProfile/index.html" class="dropdown-item">My Profile</a></li>
                              <li><a class="dropdown-item" id="btn-logout" href="#" onclick="logout(); return false;">Logout</a></li>
                            </ul>
                          </div>
                    </li>
                </ul>
            </div>
        </div>`;
        document.getElementById("btn-profile").innerHTML = 'Hello ' + localStorage.getItem("email");
}

function logout()
{
   localStorage.setItem("logIn", 'false');
    console.log(localStorage.getItem("logIn"));
    checkLogin();
}