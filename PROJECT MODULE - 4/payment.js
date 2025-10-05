
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ1cgQuydukNEe3ZmLraujPvBjXAT123Y",
  authDomain: "akshita-hospital.firebaseapp.com",
  databaseURL: "https://akshita-hospital-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "akshita-hospital",
  storageBucket: "akshita-hospital.firebasestorage.app",
  messagingSenderId: "663694107461",
  appId: "1:663694107461:web:3f0be7085bcf8a50fbd42c",
  measurementId: "G-K1M8Y2WDW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize services array
let services = [];

// Function to add a service
function addService() {
  const name = document.getElementById('serviceName').value.trim();
  const cost = parseFloat(document.getElementById('serviceCost').value);

  if (!name || isNaN(cost)) {
    alert("Please enter valid service details.");
    return;
  }

  services.push({ name, cost });
  updateTable();
  clearInputs();
}

// Function to update the services table
function updateTable() {
  const tbody = document.getElementById('serviceTable').querySelector('tbody');
  tbody.innerHTML = '';
  let total = 0;

  services.forEach(service => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${service.name}</td><td>${service.cost.toFixed(2)}</td>`;
    tbody.appendChild(row);
    total += service.cost;
  });

  document.getElementById('totalCost').innerText = total.toFixed(2);
}

// Function to clear input fields
function clearInputs() {
  document.getElementById('serviceName').value = '';
  document.getElementById('serviceCost').value = '';
}

// Function to generate invoice
function generateInvoice() {
  const patient = document.getElementById('patientName').value.trim();
  const insurance = document.getElementById('insuranceProvider').value.trim();
  const total = services.reduce((sum, s) => sum + s.cost, 0);

  if (!patient || !insurance || services.length === 0) {
    alert("Please complete all billing fields.");
    return;
  }

  document.getElementById('invPatient').innerText = patient;
  document.getElementById('invInsurance').innerText = insurance;
  document.getElementById('invTotal').innerText = total.toFixed(2);
  document.getElementById('invoiceSection').classList.remove('hidden');
}

// Function to process payment and save to Firestore
async function processPayment() {
  const patient = document.getElementById('patientName').value.trim();
  const insurance = document.getElementById('insuranceProvider').value.trim();
  const total = services.reduce((sum, s) => sum + s.cost, 0);
  const date = new Date().toISOString();

  if (!patient || !insurance || services.length === 0) {
    alert("Please complete all billing fields before payment.");
    return;
  }

  try {
    await addDoc(collection(db, "payments"), {
      patient,
      insurance,
      total,
      date,
      services
    });

    alert(`Payment of $${total.toFixed(2)} successful!`);
    window.location.href = "index.html";
  } catch (e) {
    console.error("Error saving payment: ", e);
    alert("Payment failed. Please try again.");
  }
}

// Function to load payment history by patient name
async function loadPaymentHistory() {
  const name = document.getElementById('historyPatientName').value.trim();
  if (!name) {
    alert("Enter a patient name.");
    return;
  }

  const q = query(collection(db, "payments"), where("patient", "==", name));
  const querySnapshot = await getDocs(q);

  const historyDiv = document.getElementById('historyResults');
  historyDiv.innerHTML = '';

  if (querySnapshot.empty) {
    historyDiv.innerHTML = '<p>No history found for this patient.</p>';
    return;
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const entry = `
      <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
        <p><strong>Date:</strong> ${new Date(data.date).toLocaleString()}</p>
        <p><strong>Total Paid:</strong> $${data.total.toFixed(2)}</p>
        <p><strong>Insurance Provider:</strong> ${data.insurance}</p>
        <p><strong>Services:</strong> ${data.services.map(s => `${s.name} ($${s.cost})`).join(", ")}</p>
      </div>
    `;
    historyDiv.innerHTML += entry;
  });
}

// Expose functions to the global scope
window.addService = addService;
window.generateInvoice = generateInvoice;
window.processPayment = processPayment;
window.loadPaymentHistory = loadPaymentHistory;
