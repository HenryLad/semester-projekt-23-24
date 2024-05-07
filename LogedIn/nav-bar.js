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
    document.getElementById("btn-profile").innerHTML = 'Hello ' + localStorage.getItem("email");
}

function logout()
{
   localStorage.setItem("logIn", 'false');
    console.log(localStorage.getItem("logIn"));
    checkLogin();
}