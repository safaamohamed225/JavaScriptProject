// an Array object to save user data
let usersData = [];

// method to catch entered data from users
function catchValues() {
  const userName = document.querySelector("#regName").value;
  const fullName = document.querySelector("#fullName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#userpass").value;
  const user = {
    username: userName,
    name: fullName,
    email: email,
    password: password,
  };
  if(((user.username=="" || user.name=="") &&  (user.email=="" || user.password))){
    alert("Empty Data");
  }else{
    filterData(user);  
  }
    
}

// method to filter user data for duplicates
function filterData(user) {
  const storedData = JSON.parse(localStorage.getItem("usersNames"));
  if (storedData) {
    const filteredData = storedData.filter((data) => {
      return data.username !== user.username && data.email !== user.email;
    });
    filteredData.push(user);
    usersData = filteredData;
  } else {
    usersData.push(user);
  }
  let obj = JSON.stringify(usersData);
  localStorage.setItem("usersNames", obj);
}

// method to check if username and password are in local storage
function checkLogin() {
  const userName = document.querySelector("#userName").value;
  const password = document.querySelector("#Password").value;
  if (userName == "Admin" && password == "admin123") {
    location.href = "./adminCruds.html"; // add the link of admin page
  } else {
    const storedData = JSON.parse(localStorage.getItem("usersNames"));
    if (storedData) {
      const user = storedData.find((data) => {
        return data.username === userName && data.password === password;
      });
      if (user) {
        location.href = "Home.html"; // add the link of product page
      } else {
        alert("There is something wrong with username or password.");
      }
    } else {
      goToSignUp();
    }
  }
}

//method to go to sign up first if no users Found
function goToSignUp() {
  let nousers = confirm("Sign Up First");
  if (nousers) {
    switched();
  }
}

//method to go to the register form
function register() {
  catchValues();
  back();
}

// time out method to 1.2 sec to show the wallpaper
setTimeout(() => {
  document.getElementById("sign").style.visibility = "visible";
}, 10);

// method move you to the sign up form
function switched() {
  document.getElementById("sign").style.visibility = "hidden";
  document.getElementById("signUp").style.visibility = "visible";
}

// method move you to the sign in form
function back() {
  document.getElementById("sign").style.visibility = "visible";
  document.getElementById("signUp").style.visibility = "hidden";
}
