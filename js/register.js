import { auth, db } from "./firebase.js";

import { 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



const registerBtn = document.getElementById("registerBtn");

const msg = document.getElementById("msg");



registerBtn.addEventListener("click", async()=>{


const username =
document.getElementById("fullName").value.trim();


const email =
document.getElementById("email").value.trim();


const password =
document.getElementById("password").value;

const confirmPassword =
document.getElementById("confirmPassword").value;



if(!username || !email || !password){

    msg.textContent="Please fill all fields.";
    msg.style.color="red";
    return;

}

if (password !== confirmPassword) {
    msg.textContent = "Passwords do not match.";
    msg.style.color = "red";
    return;
}

try{


// Create Firebase account

const userCredential =
await createUserWithEmailAndPassword(
    auth,
    email,
    password
);



const user =
userCredential.user;



// Save username into Firestore

await setDoc(
doc(db,"users",user.uid),
{

    username: username,
    email: email

}

);



msg.textContent=
"Account created successfully!";

msg.style.color="green";



setTimeout(()=>{

window.location.href="login.html";

},1500);



}

catch(error){


msg.textContent=error.message;

msg.style.color="red";


}



});