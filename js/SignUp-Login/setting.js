import { MD5 } from "./md5.js";

// input
const username = document.getElementById("username");
const phone = document.getElementById("phone");
const avatar = document.getElementById("avatar");
const email = document.getElementById("email");

const emailLogin = localStorage.getItem("emailLogin");

try {
  if (emailLogin != null) {
    const data = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", emailLogin)
      .get();

    const userInformation = data.docs[0].data();
    if (userInformation.avatar == "") {
      avatar.src = "./images/user/user.jpg";
    } else {
      avatar.src = userInformation.avatar;
    }
    email.innerText = userInformation.email;
    username.innerText = userInformation.username;
    phone.innerText = userInformation.phone;
  } else {
    avatar.src = "./images/user/user.jpg";
    email.innerText = "";
    username.innerText = "";
    phone.innerText = "";
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

// -------------------------- Change Info ----------------------------------
const btnChangeInfo = document.getElementById("btnChangeInfo");
async function changeinformation() {
  if (emailLogin != null) {
    const id = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", emailLogin)
      .get();
    btnChangeInfo.onclick = () => {
      Swal.fire({
        title: "Change Information",
        html: `<style>
          input{
            background:unset; 
          }
          label{
            float: left;
          }
          .swal2-popup .swal2-title{
            color: while;
          }
          .swal2-modal{
            background: rgba(0, 0, 0, 0.6);
          }
        </style>
          <hr>
          <label for="userName">Username</label>
          <input name="userName" id="username" class="swal2-input">
          <label for="phoneNumber">Phone Number</label>
          <input name="phoneNumber" id="phoneNumber" class="swal2-input">
        `,
        confirmButtonText: "Confirm",
        focusConfirm: false,
        preConfirm: () => {
          const username = Swal.getPopup().querySelector("#username").value;
          const phonenumber =
            Swal.getPopup().querySelector("#phoneNumber").value;
          return { userName: username, phoneNumber: phonenumber };
        },
      }).then(async function (result) {
        if (result.value.userName != "" && result.value.phoneNumber != "") {
          const user = await firebase
            .firestore()
            .collection("users")
            .doc(id.docs[0].id)
            .update({
              username: result.value.userName,
              phone: result.value.phoneNumber,
            });
          Swal.fire({
            icon: "success",
            title: "Update success!",
          });
        } else if (
          result.value.userName != "" &&
          result.value.phoneNumber == ""
        ) {
          const user = await firebase
            .firestore()
            .collection("users")
            .doc(id.docs[0].id)
            .update({
              username: result.value.userName,
            });
          Swal.fire({
            icon: "success",
            title: "Update success!",
          });
        } else if (
          result.value.phoneNumber != "" &&
          result.value.userName == ""
        ) {
          const user = await firebase
            .firestore()
            .collection("users")
            .doc(id.docs[0].id)
            .update({
              phone: result.value.phoneNumber,
            });
          Swal.fire({
            icon: "success",
            title: "Update success!",
          });
        } else {
        }
      });
    };
  }
}
changeinformation();

// ----------------------- Change password ---------------------------------
const btnChangePW = document.getElementById("btnChangePW");
async function changepassword() {
  if (emailLogin != null) {
    const id = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", emailLogin)
      .get();

    btnChangePW.onclick = () => {
      Swal.fire({
        title: "Change Password",
        html: `<style>
          input{
            background:unset; 
          }
          label{
            float: left;
          }
          .swal2-popup .swal2-title{
            color: while;
          }
          .swal2-modal{
            background: rgba(0, 0, 0, 0.6);
          }
        </style>
          <hr>
          <label for="PW">Password</label>
          <input type="password" name="PW" id="PW" class="swal2-input">
        `,
        confirmButtonText: "Confirm",
        focusConfirm: false,
        preConfirm: () => {
          const password = Swal.getPopup().querySelector("#PW").value;
          return { PW: password };
        },
      }).then(async function (result) {
        if (result.value.PW != "") {
          // update pass in store
          const user = await firebase
            .firestore()
            .collection("users")
            .doc(id.docs[0].id)
            .update({
              password: MD5(result.value.PW),
            });
          // update pass in auth()
          const userAuth = firebase.auth().currentUser;
          const newPassword = MD5(result.value.PW);
          userAuth
            .updatePassword(newPassword)
            .then(() => {})
            .catch((error) => {});
          Swal.fire({
            icon: "success",
            title: "Update success!",
          });
        }
      });
    };
  }
}
changepassword();

// --------------------- List Followed Film --------------------------------
const divList = document.getElementById("listFollowedFilm");
/**
 * ReadFilm
 * @param {*} listFilm
 */
async function getListFilms() {
  if (emailLogin != null) {
    try {
      let id = await firebase
        .firestore()
        .collection("users")
        .where("email", "==", emailLogin)
        .get();
      let listIDFilm = id.docs[0].data().listFollowedFilm;
      console.log(listIDFilm);
      const films = await firebase.firestore().collection("films").get();
      for (let i = 0; i < listIDFilm.length; i++) {
        // console.log(listIDFilm[i]);
        films.docs.forEach((doc) => {
          if (doc.id == listIDFilm[i]) {
            console.log(doc.id, ` : `, listIDFilm[i]);
            divList.insertAdjacentHTML(
              "beforeend",
              `<basic2-para
            avatar = "./img/02.jpg"
            href = "./movie-intro.html"
            name = "${doc.data().filmName}"
            age = "${doc.data().age}"
            time = "${doc.data().time} m"
            like = "${doc.data().vote}"
            id = "${doc.id}"
          ></basic2-para>`
            );
          }
        });
        console.log("----------------------------------------------");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
getListFilms();
// ------------------------ Change Avatar ----------------------------------
const avt = document.getElementById("avatar");
async function changeAvatar() {
  if (emailLogin != null) {
    const id = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", emailLogin)
      .get();

    avt.onclick = () => {
      Swal.fire({
        title: "Change Avatar",
        html: `<style>
          input{
            background:unset; 
          }
          label{
            float: left;
          }
          .swal2-popup .swal2-title{
            color: while;
          }
          .swal2-modal{
            background: rgba(0, 0, 0, 0.6);
          }
        </style>
          <hr>
          <label for="Avt">Avatar</label>
          <input type="file" name="Avt" id="Avt" class="swal2-input">
        `,
        confirmButtonText: "Confirm",
        focusConfirm: false,
        preConfirm: () => {
          const Avt = Swal.getPopup().querySelector("#Avt").value;
          return { avt: Avt };
        },
      }).then(async function (result) {
        if (result.value.avt != "") {
          console.log(result.value.avt);
          // Swal.fire({
          //   icon: "success",
          //   title: "Update success!",
          // });
        }
      });
    };
  }
}
changeAvatar();
