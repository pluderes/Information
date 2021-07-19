import { MD5 } from "./md5.js";

// input
const username = document.getElementById("username");
const phone = document.getElementById("phone");
const avatar = document.getElementById("avatar");
const email = document.getElementById("email");
const password = document.getElementById("password");

// button
const btnSignup = document.getElementById("btnSignup");
const Login = document.getElementById("Login");

// window.onload = () => {
//   console.log(firebase.app().name);
// };

try {
  const data = await firebase
    .firestore()
    .collection("users")
    .where("email", "==", emailLogin)
    .get();

  // data.docs.forEach((doc) => {
  const userInformation = data.docs[0].data();
  console.log(userInformation);
  console.dir(username);
  avatar.src = userInformation.avatar;
  email.innerText = userInformation.email;
  username.innerText = userInformation.username;
  phone.value = userInformation.phone;
  password.value = userInformation.password;
  // });
} catch (error) {
  // swal({
  //   title: `${error.code} - ${error.message}`,
  //   type: "warning",
  //   showCancelButton: false,
  //   confirmButtonColor: "#f8c086",
  //   confirmButtonText: "Ok",
  //   closeOnConfirm: false,
  //   closeOnCancel: false,
  // });
}

// Login.onclick = () => {
//   location.href = "login.html";
// };
