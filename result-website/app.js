// সব রেজাল্ট এখানে লোড হবে
let results = [];

// CSV ফাইল থেকে ডেটা পড়া
Papa.parse("results.csv", {
  download: true,
  header: true,          // প্রথম লাইনকে হেডার ধরে (roll, name, class, marks)
  skipEmptyLines: true,
  complete: function (data) {
    results = data.data;
    console.log("CSV Loaded:", results);
  },
  error: function (err) {
    console.error("Error loading CSV:", err);
  }
});

// DOM Elements
const rollInput = document.getElementById("rollInput");
const checkResultBtn = document.getElementById("checkResultBtn");
const errorMsg = document.getElementById("errorMsg");
const resultBox = document.getElementById("resultBox");

const studentName = document.getElementById("studentName");
const studentRoll = document.getElementById("studentRoll");
const studentClass = document.getElementById("studentClass");
const studentMarks = document.getElementById("studentMarks");

function showResult(student) {
  studentName.textContent = student.name;
  studentRoll.textContent = student.roll;
  studentClass.textContent = student.class;
  studentMarks.textContent = student.marks;

  resultBox.classList.remove("hidden");
}

function clearResult() {
  resultBox.classList.add("hidden");
}

checkResultBtn.addEventListener("click", () => {
  const roll = rollInput.value.trim();

  errorMsg.textContent = "";
  clearResult();

  if (!roll) {
    errorMsg.textContent = "দয়া করে রোল নম্বর লিখুন।";
    return;
  }

  // roll কলামটা স্ট্রিং, তাই তুলনা string হিসেবে
  const student = results.find((s) => s.roll === roll);

  if (!student) {
    errorMsg.textContent = "এই রোল নম্বরের কোনো রেজাল্ট পাওয়া যায়নি।";
    return;
  }

  showResult(student);
});

rollInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkResultBtn.click();
  }
});
