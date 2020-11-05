let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");
let registerUsername = document.getElementById("registerUsername");
let registerPassword = document.getElementById("registerPassword");
let textValidityBoxes = document.getElementsByClassName("input-validity");
let fileValidityBoxes = document.getElementsByClassName("fileValidity");

if (loginUsername) {
    loginUsername.addEventListener("invalid", function(event) {
        event.target.setCustomValidity("Username must be only letters and numbers.")
    })
}

if (loginPassword) { 
    loginPassword.addEventListener("invalid", function(event) {
        event.target.setCustomValidity("Password must be between 4 and 8 digits long and include at least one numeric digit.")
    })
}

if (registerUsername) {
    registerUsername.addEventListener("invalid", function(event) {
        event.target.setCustomValidity("Username must be only letters and numbers.")
    })
}

if (registerPassword) {
    registerPassword.addEventListener("invalid", function(event) {
        event.target.setCustomValidity("Password must be between 4 and 8 digits long and include at least one numeric digit.")
    })
}

if (textValidityBoxes) {
    for (i = 0; i < textValidityBoxes.length; i++) {
        textValidityBoxes[i].addEventListener("invalid", function(event) {
            event.target.setCustomValidity("Invalid special characters.")
        })
    }
}

if (fileValidityBoxes) {
    for (i = 0; i < fileValidityBoxes.length; i++) {
        fileValidityBoxes[i].addEventListener("invalid", function(event) {
            event.target.setCustomValidity("Please enter a valid file name.")
        })
    }
}