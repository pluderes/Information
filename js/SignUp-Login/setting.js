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
    username.innerText = userInformation.userName;
    phone.innerText = userInformation.phoneNumber;
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
            border: unset;
          }
          label{
            float: left;
          }
          .swal2-popup .swal2-title{
            color: while;
          }
          .swal2-modal{
            background: black;
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
              userName: result.value.userName,
              phoneNumber: result.value.phoneNumber,
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
              userName: result.value.userName,
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
              phoneNumber: result.value.phoneNumber,
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
          label{
            float: left;
          }
          .swal2-popup .swal2-title{
            color: while;
          }
          .swal2-modal{
            background: black;
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
              passWord: MD5(result.value.PW),
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
        films.docs.forEach((doc) => {
          if (doc.id == listIDFilm[i]) {
            // console.log(doc.id, ` : `, listIDFilm[i]);
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
          ></basic2-para>
          <div class="hover-buttons">
          <span class="btn btn-hover"
            ><i class="fa fa-close mr-1" aria-hidden="true"></i>
            UnFollow
          </span>
        </div>
          `
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

    avt.onclick = async () => {
      const { value: file } = await Swal.fire({
        html: `<style>
          .swal2-popup .swal2-title{
            color: while;
          }
          .swal2-modal{
            background: black;
          }
          .progress {
            -webkit-appearance: none;
            appearance: none;
          }
          </style>
        `,
        title: "Select image",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "Upload your profile picture",
        },
      });

      if (file) {
        var storageRef = firebase.storage().ref("avatar/" + file.name);
        storageRef.put(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          Swal.fire({
            title: "Your uploaded picture",
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture",
          });
        };
        console.log(file.name);
        reader.readAsDataURL(file);

        // get url file - test
        storageRef
          .getDownloadURL()
          .then(async (url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              var blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();

            // console.log(url);
            const user = await firebase
              .firestore()
              .collection("users")
              .doc(id.docs[0].id)
              .update({
                avatar: url,
              });
            // Or inserted into an <img> element
            var img = document.getElementById("avatar");
            img.setAttribute("src", url);
          })
          .catch((error) => {
            // Handle any errors
            console.log(error);
          });
      }
    };
  }
}
changeAvatar();
