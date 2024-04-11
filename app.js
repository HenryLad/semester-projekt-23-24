
// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";


const firebaseConfig = {

    apiKey: "AIzaSyAyc8F05C-nt5-t_-NMxLFGiWROZPrXzFY",

    authDomain: "somersemesterpro.firebaseapp.com",

    projectId: "somersemesterpro",

    storageBucket: "somersemesterpro.appspot.com",

    messagingSenderId: "725880949719",

    appId: "1:725880949719:web:71647ec4ff99fbbe889992"

};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

document.getElementById("sign-up").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Assuming 'username' is defined and accessible in this scope
    db.ref("users/" + "Users").set({
        email: email,
        password: password
    });
    alert("User saved successfully!");

});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login").addEventListener("click", function() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        var user_ref = db.ref("users/" + "Users");
        user_ref.on("value", function (snapshot) {
            let data = snapshot.val();

            if (data.email == email && data.password == password) {
                console.log("Login successful");
                window.location.href = "/LogedIn/index.html";
            }
            else {
                alert("Invalid login credentials");
            }
        });
    });
});


