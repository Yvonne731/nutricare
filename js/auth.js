// ===============================
// NutriCare Authentication
// ===============================

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("nutricareUser"));
}

function logout() {
    localStorage.removeItem("nutricareUser");
    window.location.href = "index.html";
}

function requireLogin() {

    const publicPages = [
    "index.html",
    "login.html",
    "register.html"
];
    const currentPage = window.location.pathname.split("/").pop();

    if (!publicPages.includes(currentPage) && !getCurrentUser()) {
        window.location.href = "login.html";
    }

}

window.getCurrentUser = getCurrentUser;
window.logout = logout;
window.requireLogin = requireLogin;

function getUserKey(key) {

    const user = getCurrentUser();

    if (!user) return null;

    return `${user.uid}_${key}`;
}

window.getUserKey = getUserKey;

document.addEventListener("DOMContentLoaded", () => {

    const authMenu = document.getElementById("authMenu");

    if (!authMenu) return;

    const user = getCurrentUser();

    if (user) {

        authMenu.innerHTML = `
            <a
                href="#"
                class="nav-link"
                onclick="logout()">
                Logout
            </a>
        `;

    } else {

        authMenu.innerHTML = `
            <a
                href="login.html"
                class="nav-link">
                Login
            </a>
        `;

    }

});