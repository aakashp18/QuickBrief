
const registerBtn = document.getElementById("registerBtn");

const usernameInput =
    document.getElementById("registerUsername");

const emailInput =
    document.getElementById("registerEmail");

const passwordInput =
    document.getElementById("registerPassword");

const message =
    document.getElementById("registerMessage");


registerBtn.addEventListener("click", async function () {

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;


    // Check empty fields
    if (!username || !email || !password) {
        message.textContent = "Please fill all fields.";
        return;
    }


    // Username validation: 3-20 letters and numbers only
    const usernamePattern = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,20}$/;

    if (!usernamePattern.test(username)) {
        message.textContent =
            "Username must be 3-20 characters and contain only letters and numbers.";
        return;
    }


    // Password validation: minimum 8 characters,
    // at least one letter and one number, no spaces
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9])\S{8,}$/;

    if (!passwordPattern.test(password)) {
        message.textContent =
            "Password must contain at least 8 characters, including letters and numbers, without spaces.";
        return;
    }


    message.textContent = "Creating account...";


    try {

        const response = await fetch(
            "/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.error || "Registration failed."
            );
        }


        message.textContent =
            "Account created successfully!";


        // Clear fields
        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";


        // Go back to login after 1.5 seconds
        setTimeout(function () {
            window.location.href = "/pages/login.html";
        }, 1500);


    } catch (error) {

        console.error(error);

        message.textContent =
            "Error: " + error.message;

    }

});
