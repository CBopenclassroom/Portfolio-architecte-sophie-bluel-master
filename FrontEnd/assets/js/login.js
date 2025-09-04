function login() {
    const logins = document.getElementById("loginForm")
    logins.addEventListener("submit", async function (event) {
        event.preventDefault();
        const errorMessage = document.getElementById("error-message")
        errorMessage.innerText = ""

        const loginInformations = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }

        const Charge = JSON.stringify(loginInformations)

        const result = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: Charge
        })

        if (!result.ok) {
            errorMessage.innerText = "Email ou mot de passe incorrect"
        } else {
            const resultDecoded = await result.json();
            localStorage.setItem("token", resultDecoded.token)
            location.href = "index.html"
        }


    })
}

login()
