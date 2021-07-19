import { MD5 } from "./md5.js";

const username = document.getElementById("username");
const phone = document.getElementById("phone");
const avatar = document.getElementById("avatar");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("rePassword");

const btnLogout = document.getElementById("btnLogout");
const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");

let IDEmail = "";
let Email = "";
let emailLogin = "";

if (typeof Storage !== "undefined") {
  emailLogin = localStorage.getItem("email");
}

try {
  const data = await firebase
    .firestore()
    .collection("users")
    .where("email", "==", emailLogin)
    .get();

  data.docs.forEach((doc) => {
    IDEmail = doc.id;
    Email = doc.data().email;
    console.log(doc.id, " => ", doc.data());
    username.value = doc.data().username;
    phone.value = doc.data().phone;
  });
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

btnUpdate.onclick = () => {
  if (
    username.value.trim() == "" ||
    phone.value.trim() == "" ||
    avatar.value.trim() == "" ||
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
    try {
      // update firestore
      const userDone = firebase
        .firestore()
        .collection("users")
        .doc(IDEmail)
        .update({
          username: username.value,
          phone: phone.value,
          email: Email,
          password: MD5(password.value),
          avatar: avatar.value,
        });
      const user = firebase.auth().currentUser;
      const newPassword = MD5(password.value);

      // update pass in auth()
      user
        .updatePassword(newPassword)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });

      swal({
        title: "Cập nhật thông tin thành công!",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "#40f756",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    } catch (error) {
      swal({
        title: "Nhập thông tin sai!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    }
  }
};

btnDelete.onclick = async function deleteAccount() {
  console.log(IDEmail);
  try {
    await firebase.firestore().collection("users").doc(IDEmail).delete();

    swal(
      {
        title: "Đã xóa tài khoản!",
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
  } catch (error) {
    swal({
      title: "Có lỗi rồi!",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ok",
      closeOnConfirm: false,
      closeOnCancel: false,
    });
  }
};

btnLogout.onclick = () => {
  location.href = "login.html";
};
