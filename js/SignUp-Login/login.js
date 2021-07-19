import { MD5 } from "./md5.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

const btnLogin = document.getElementById("btnLogin");
const sigup = document.getElementById("Sigup");

btnLogin.onclick = () => {
  if (typeof Storage !== "undefined") {
    localStorage.setItem("email", email.value);
    localStorage.setItem("javascript", "học tại toidicode.com");
  } else {
    alert(
      "Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!"
    );
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, MD5(password.value))
    .then((userCredential) => {
      const user = userCredential.user;

      if (user.emailVerified == true) {
        swal(
          {
            title: "Đăng nhập thành công!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#40f756",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            closeOnCancel: false,
          },
          function (isConfirm) {
            if (isConfirm) {
              location.href = "./index.html";
            }
          }
        );
      } else {
        swal({
          title: "Email chưa được xác nhận!",
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#f8c086",
          confirmButtonText: "Ok",
          closeOnConfirm: false,
          closeOnCancel: false,
        });
      }
    })
    .catch((error) => {
      swal({
        title: "Email hoặc mật khẩu sai rồi!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#f8c086",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    });
};

sigup.onclick = () => {
  location.href = "signup.html";
};
