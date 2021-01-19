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
  document.addEventListener("DOMContentLoaded", addAllStudentToList);
  secondCardBody.addEventListener("click", deleteStudent);
}
function deleteStudent(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteStudentFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Student removed from list successfully");
  }
}
function deleteStudentFromStorage(delStudent) {
  let students = getStudentsFromStorage();
  students.forEach(function (student, index) {
    if (student === delStudent) {
      students.splice(index, 1);
    }
  });
  localStorage.setItem("students", JSON.stringify(students));
}

function addAllStudentToList() {
  let students = getStudentsFromStorage();
  students.forEach(function (newStudent) {
    addStudentsToList(newStudent);
  });
}
function addStudent(e) {
  let students = getStudentsFromStorage();
  const newStudent = studentInput.value.trim();
  const male = document.getElementById("male");
  const female = document.getElementById("female");

  if (newStudent === "") {
    showAlert("danger", "Ooops! Write name of the student..");
  } else if (male.checked === false && female.checked === false) {
    showAlert("danger", "Oopss! Choose the gender..");
  } else if (students.includes(newStudent)) {
    showAlert("danger", "Oopss! You added this student before.");
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
