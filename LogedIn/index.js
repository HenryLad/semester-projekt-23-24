document.addEventListener("DOMContentLoaded", checkLogin());
function checkLogin()
{
   let isLoggedIn = localStorage.getItem('logIn') === 'true';
   // At the beginning of the file
   if (!isLoggedIn) {
       window.location.href = "../SignIn.html";
   }
}

function logout()
{
   localStorage.setItem("logIn", 'false');
    console.log(localStorage.getItem("logIn"));
    checkLogin();
}