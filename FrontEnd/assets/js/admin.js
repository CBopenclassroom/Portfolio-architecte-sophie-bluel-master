async function checkToken() {
    const loginToken = localStorage.getItem("token")
    const editionHeader = document.querySelector(".edition-header")
    const filter = document.querySelector(".filter")
    const titleI = document.querySelector(".title i")
    const titleP = document.querySelector(".title p")
    const login = document.getElementById("login")
    if (loginToken) {
        editionHeader.style.display = 'flex';
        filter.style.display = 'none';
        titleI.style.display = 'null';
        titleP.style.display = 'block';
        login.textContent = "logout";
        logOut();
    } else {
        editionHeader.style.display = 'none';
        titleI.style.display = 'none';
        titleP.style.display = 'none';
        filter.style.display = 'null';
        login.textContent = "login"
    }
}

checkToken()

function logOut() {
    const loginButton = document.getElementById("login")
    loginButton.addEventListener("click", function () {
        localStorage.removeItem("token")
    })
}