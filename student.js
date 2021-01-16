const form = document.querySelector("#student-form");
const studentInput = document.querySelector("#student");
const studentList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearStudents = document.querySelector("#clear-students");

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addStudent);
}

function addStudent(e) {
  const newStudent = studentInput.value.trim();
  const male = document.getElementById("male");
  const female = document.getElementById("female");

  if (newStudent === "") {
    showAlert("danger", "Ooops! Write name of the student..");
  } else if (male.checked === false && female.checked === false) {
    showAlert("danger", "Oopss! Choose the gender..");
  } else {
    addStudentsToList(newStudent);
    addStudentToStorage(newStudent);
    showAlert("success", "Student added successfully");
  }

  e.preventDefault();
}
function getStudentsFromStorage() {
  let students;
  if (localStorage.getItem("students") === null) {
    students = [];
  } else {
    students = JSON.parse(localStorage.getItem("students"));
  }
  return students;
}

function addStudentToStorage(newStudent) {
  let students = getStudentsFromStorage();
  students.push(newStudent);
  // console.log(students);
  localStorage.setItem("students", JSON.stringify(students));
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 2000);
}

function addStudentsToList(newStudent) {
  const listItem = document.createElement("li");
  if (male.checked === true) {
    listItem.className =
      "list-group-item d-flex justify-content-between text-info";
  } else {
    listItem.className =
      "list-group-item d-flex justify-content-between text-danger";
  }

  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.appendChild(document.createTextNode(newStudent));
  listItem.appendChild(link);
  studentList.appendChild(listItem);
  studentInput.value = "";
  male.checked = false;
  female.checked = false;
}
