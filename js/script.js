document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let message = document.getElementById("message");

    if (validateEmail(email)) {
        message.style.color = "green";
        message.textContent = "Password reset link sent to your email.";
    } else {
        message.style.color = "red";
        message.textContent = "Please enter a valid email.";
    }
});

// Function to validate email format
function validateEmail(email) {
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}