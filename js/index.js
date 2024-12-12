var signPage = document.querySelector(".sign-in-and-up");
var nameInput = document.querySelector("#name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
// sign in, all good
var loginButton = document.getElementById("logIn");
var signUpPageButton = document.getElementById("signUpPage"); // go to signup page
// sign up, all good
var signUpButton = document.getElementById("signUp");
var signInPageButton = document.getElementById("signInPage"); // go to login page
// home page
var homePage = document.querySelector(".home-page");
var logOutButton = document.getElementById("logOut");
var welcomeUserHome = document.getElementById("welcomeUser"); //show username in home
// alerts......  if error, we remove d-none
var existsAlert = document.querySelector("#exists");
var requiredAlert = document.querySelector("#required"); // registration, not working tho
var writeCorrectlyAlert = document.querySelector("#writeCorrectly"); //regex, working
var successAlert = document.querySelector("#success"); // done w/ register, working
var incorrectAlert = document.querySelector("#incorrect"); // logging in error

var pInSignUp = document.querySelector("#inSignUp"); // p tag
var pInSignIn = document.querySelector("#inSignIn"); // p tag

var usersLog;

if (localStorage.getItem("users") == null) {
  usersLog = [];
} else {
  usersLog = JSON.parse(localStorage.getItem("users"));
}

// button to sign up
signUpPageButton.addEventListener("click", function () {
  // console.log("yeeet");

  nameInput.classList.remove("d-none");
  pInSignIn.classList.add("d-none");
  pInSignUp.classList.remove("d-none");
  loginButton.classList.add("d-none");
  signUpButton.classList.remove("d-none");
});

// button to sign in
signInPageButton.addEventListener("click", function () {
  // console.log("yeet2");

  nameInput.classList.add("d-none");
  pInSignIn.classList.remove("d-none");
  pInSignUp.classList.add("d-none");
  loginButton.classList.remove("d-none");
  signUpButton.classList.add("d-none");
});

// validation
function validateInput(element) {
  // console.log(element.id,element.value);

  var regex = {
    name: /[a-z]{3,}/i,
    email: /\w{3,}@\w{3,}\.\w{2,}/i,
    password: /.{5,}/i,
  };
  if (regex[element.id].test(element.value) == true) {
    console.log("match!!!!!");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    writeCorrectlyAlert.classList.add("d-none");
  } else {
    console.log("not match!!!!!");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    writeCorrectlyAlert.classList.remove("d-none");
  }
}

// registration
signUpButton.addEventListener("click", function () {
  // console.log("alooooo");

  if (
    nameInput.classList.contains("is-valid") &&
    emailInput.classList.contains("is-valid") &&
    passwordInput.classList.contains("is-valid")
  ) {
    var user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    usersLog.push(user);
    localStorage.setItem("users", JSON.stringify(usersLog));
    console.log(usersLog);
    successAlert.classList.remove("d-none");
  } else {
    console.log("nuh uhhh");

    // alert("no valid data, make sure of it!!");
    requiredAlert.classList.remove("d-none");
  }
  clear();
});

function clear() {
  nameInput.value = null;
  emailInput.value = null;
  passwordInput.value = null;
  nameInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  passwordInput.classList.remove("is-valid");
  nameInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
}

// logging in
loginButton.addEventListener("click", function () {
  // console.log("logggiiiinnnggg");
  // console.log(usersLog);

  for (let i of usersLog) {
    // console.log("user");
    if (i.email == emailInput.value && i.password == passwordInput.value) {
      // console.log("yep");
      let nameFromLoop = i.name;
      clear();
      return goToHmPg(nameFromLoop);
    }
  }
  incorrectAlert.classList.remove("d-none");
});

function goToHmPg(nameFromLoop) {
  // homepage name
  // if login is successful, then do this :
  let userName = [nameFromLoop];
  let webPage = userName.map((name) => `welcome ${name}`);
  document.querySelector("h1#welcomeUser").innerHTML = webPage;
  // remove d-none of homepage & add d-none to sign page
  signPage.classList.add("d-none");
  homePage.classList.remove("d-none");
}

// logging out
logOutButton.addEventListener("click", function () {
  // console.log("baraaa");
  signPage.classList.remove("d-none");
  homePage.classList.add("d-none");
});
