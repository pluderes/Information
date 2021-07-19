import { MD5 } from "./md5.js";

// input
const username = document.getElementById("username");
const phone = document.getElementById("phone");
const avatar = document.getElementById("avatar");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("rePassword");

// button
const btnSignup = document.getElementById("btnSignup");
const Login = document.getElementById("Login");

window.onload = () => {
  console.log(firebase.app().name);
};

/**
 * Function get accounts by email
 * @param {*} value : email
 */
async function checkExitEmail(value) {
  try {
    const data = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", value)
      .get();

    return data;
  } catch (error) {
    swal({
      title: `${error.code} - ${error.message}`,
      // text: "Hãy cẩn thận với lựa chọn của bạn!",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ok",
      // cancelButtonText: "",
      closeOnConfirm: false,
      closeOnCancel: false,
    });
  }
}

/**
 * Create user infor
 * @param {*} userInfo
 */
async function createAccount() {
  try {
    const response = await checkExitEmail(email.value);
    if (response.docs.length > 0) {
      swal(
        {
          title: `Email đã tồn tại! Về trang đăng nhập?`,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f8c086",
          confirmButtonText: "Ok",
          cancelButtonText: "Không",
          closeOnConfirm: false,
          closeOnCancel: true,
        },
        function (isConfirm) {
          if (isConfirm) {
            location.href = "login.html";
          }
        }
      );
    } else if (
      username.value.trim() == "" ||
      phone.value.trim() == "" ||
      avatar.value.trim() == "" ||
      email.value.trim() == "" ||
      password.value.trim() == "" ||
      rePassword.value.trim() == ""
    ) {
      swal({
        title: "Chưa nhập đủ thông tin!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    } else if (password.value.trim() != rePassword.value.trim()) {
      swal({
        title: "Nhập lại mật khẩu không chính xác!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
      return;
    } else {
      const userDone = await firebase
        .firestore()
        .collection("users")
        .add({
          username: username.value,
          phone: phone.value,
          email: email.value,
          avatar: avatar.value,
          password: MD5(password.value),
        });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, MD5(password.value))
        .then((data) => {
          return firebase.auth().currentUser.sendEmailVerification();
        })
        .then(() => {
          swal(
            {
              title: "Đăng kí thành công!",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#40f756",
              confirmButtonText: "Ok",
              closeOnConfirm: false,
              closeOnCancel: false,
            },
            function (isConfirm) {
              if (isConfirm) {
                location.href = "login.html";
              }
            }
          );
        });
    }
  } catch (error) {
    swal({
      title: `${error.code} - ${error.message}`,
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#f8c086",
      confirmButtonText: "Ok",
      closeOnConfirm: false,
      closeOnCancel: false,
    });
  }
}

btnSignup.onclick = () => {
  checkExitEmail(email.value);
  createAccount();
  sessionStorage.setItem("username", username.value);
  sessionStorage.setItem("phone", phone.value);
  sessionStorage.setItem("email", email.value);
  sessionStorage.setItem("avatar", avatar.value);
  sessionStorage.setItem("password", password.value);
};

Login.onclick = () => {
  location.href = "login.html";
};
