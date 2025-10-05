import { auth, db } from "./firebase-config.js";

import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-form");
  const logoutBtn = document.getElementById("logout-btn");

  if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to the main page after login
    } catch (error) {
      console.error("Error during login:", error);


      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found. Please check the email address.");
          break;
        case "auth/wrong-password":
          alert("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          alert("Invalid email format.");
          break;
        default:
          alert("Error: " + error.message);
      }
    }
  });
}


  if (signupBtn) {
  
    signupBtn.addEventListener("submit", async (e) => {
      e.preventDefault();
      let obj = {}
      let data = new FormData(signupBtn);
      for (let [key, value] of data.entries()) {
        obj[key] = value;
      }
      await createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setDoc(doc(db, "users", user.uid), {
            role: obj.role,
            name: obj.fullname,
            username: obj.username,
            email: obj.email,
            createdAt: new Date(),
          });
          alert("Signup successful!");
          window.open("login.html", "_self"); 
        })
        .catch((error) => {
          console.error("Error during signup:", error);
          alert("Error: " + error.message);
        });
    })

  
  }

});

// for remainder
 window.addEventListener("DOMContentLoaded", () => {
      const data = localStorage.getItem("appointment");
      if (!data) return;

      const appointment = JSON.parse(data);
      const now = Date.now();
      const delay = appointment.timestamp - now;

      const showReminder = () => {
        const banner = document.getElementById("reminder-banner");
        banner.innerHTML = `🔔 Reminder: Your appointment for <strong>${appointment.day}</strong> at <strong>${appointment.time}</strong> is now.`;
        alert(`🔔 Reminder: Your appointment for ${appointment.day} at ${appointment.time} is now.`);
        banner.style.display = "block";
        localStorage.removeItem("appointment");
      };

      if (delay > 0) {
        setTimeout(showReminder, delay);
      } else {
        showReminder();
      }
    });


    // popup js 
    const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-btn");
const toggleBtn = document.getElementById("popup-toggle");

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

toggleBtn.addEventListener("click", () => {
  popup.style.display = popup.style.display === "none" ? "block" : "none";
  window.location.href = "symptom.html"; // Redirect to the symptom checker page
});
