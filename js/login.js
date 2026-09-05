import { auth, db } from "./firebase.js";
import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        msg.textContent = "Please fill all fields.";
        msg.style.color = "red";
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Read user profile from Firestore
        const docRef = doc(db, "users", userCredential.user.uid);

        const docSnap = await getDoc(docRef);

        const profile = docSnap.data();

        // Save login session
        localStorage.setItem("nutricareUser", JSON.stringify({
           uid: userCredential.user.uid,
           email: email,
           username: profile.username

        }));

        msg.textContent = "Login successful!";
        msg.style.color = "green";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {
        msg.textContent = "Invalid email or password.";
        msg.style.color = "red";
    }
});