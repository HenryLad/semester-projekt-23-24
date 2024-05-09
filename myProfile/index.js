document.addEventListener("DOMContentLoaded", function() {
    checkLogin();
    init();
});

function checkLogin() {
    let isLoggedIn = localStorage.getItem('logIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = "../SignIn.html";
    }
}

function init() {
    document.getElementById("btn-profile").innerHTML = 'Hello ' + localStorage.getItem("email");

    let user_name = document.getElementById("user_name");
    let user_bio = document.getElementById("user_bio");
    let user_location = document.getElementById("user_Location");
    let user_email = document.getElementById("user_email");
    let user_phone = document.getElementById("user_phone");

    user_name.innerHTML = '<strong>Name</strong>: ' + localStorage.getItem("name");
    user_bio.innerHTML = '<strong>Bio</strong>: ' + localStorage.getItem("bio");
    user_location.innerHTML = '<strong>Location</strong>: ' + localStorage.getItem("location");
    user_email.innerHTML = '<strong>Email</strong>: ' + localStorage.getItem("email_input");
    user_phone.innerHTML = '<strong>Phone</strong>: ' + localStorage.getItem("phone");
}

function logout() {
    localStorage.setItem("logIn", 'false');
    console.log(localStorage.getItem("logIn"));
    checkLogin();
}

function configure() {
    event.preventDefault();
    let inputName = document.getElementById("inputName").value;
    let inputBio = document.getElementById("inputBio").value;
    let inputLocation = document.getElementById("inputLocation").value;
    let inputEmail = document.getElementById("inputEmail").value;
    let inputPhone = document.getElementById("inputPhone").value;
    
    // Update only the entered string and keep other values unchanged
    if (inputName) {
        localStorage.setItem("name", inputName);
    }
    if (inputBio) {
        localStorage.setItem("bio", inputBio);
    }
    if (inputLocation) {
        localStorage.setItem("location", inputLocation);
    }
    if (inputEmail) {
        if(!inputEmail.includes("@")){alert("Please enter a valid email address"); return;}
        localStorage.setItem("email_input", inputEmail);
    }
    if (inputPhone) {
        localStorage.setItem("phone", inputPhone);
    }

    init(); // Update displayed information
}


document.getElementById("btn-save").addEventListener("click", configure);
