import Films from "./Films.js";
import * as filmData from "./filmData.js";

const addFilmBtn = document.getElementById("addFilmBtn");
const tagRow = document.getElementById("tag-film");
const rowContent = document.getElementById("rowContent");

/**
 * Create Film
 * @param {*} film
 */
async function addFilms(film) {
  try {
    await firebase.firestore().collection("films").add({
      filmName: film.filmName,
      imageURL: film.imageURL,
      releaseYear: film.releaseYear,
      description: film.description,
      filmStatus: film.filmStatus,
      genre: film.genre,
      country: film.country,
      directors: film.directors,
      actors: film.actors,
      view: film.view,
      vote: film.vote,
      age: film.age,
      href: film.href,
      time: film.time,
      comment_ids: film.comment_ids,
    });
    console.log("done");
  } catch (error) {
    // helper.alertError(`${error.code} - ${error.message}`);
    console.log(error);
  }
}

// addFilmBtn.onclick = () => {
// addFilms(filmData.film1);
// addFilms(filmData.film2);
// addFilms(filmData.film3);
// addFilms(filmData.film4);
// addFilms(filmData.film5);
// addFilms(filmData.film6);
// addFilms(filmData.film7);
// addFilms(filmData.film8);
// addFilms(filmData.film9);
// addFilms(filmData.film10);
// };
/**
 * ReadFilm
 * @param {*} film
 */
async function getFilms() {
  try {
    const data = await firebase.firestore().collection("films").get();
    rowContent.firstChild.firstChild.style.width = "unset";
    rowContent.firstChild.firstChild.style.display = "flex";
    data.docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().filmName);
      rowContent.firstChild.firstChild.insertAdjacentHTML(
        "beforeend",
        `<basic-para
        avatar = "./img/02.jpg"
        href = "Href-Film2"
        name = "${doc.data().filmName}"
        age = "20"
        time = "3h 30m"
        like = "30"
        id = "${doc.id}"
      ></basic-para>`
      );
    });
    console.log("----------------------------------------------");
  } catch (error) {
    console.log(error);
  }
}
getFilms();

// -------------------------------------------------------------------
// console.log(card);
// console.log(card.length);
// for (let i = 0; i < card.length; i++) {
//   let add = document.getElementById(`${card[i]}`);
//   add.onclick = () => {
//     console.dir(card[i]);
//   };
// }

// -------------------------- Log out --------------------------------
const Logout = document.getElementById("Logout");
Logout.onclick = () => {
  localStorage.removeItem("emailLogin");
};
let emailLogin = localStorage.getItem("emailLogin");

// ----------------------------- Add follow film ---------------------
let IDfilm = "";
async function listFilms() {
  try {
    const data = await firebase.firestore().collection("films").get();
    let count = data.docs.length;
    for (let i = 0; i < count; i++) {
      let tagfilm = document.getElementById(`${data.docs[i].id}`);
      tagfilm.onclick = () => {
        if (emailLogin == null) {
          alert("Bạn chưa đăng nhập!");
        } else {
          IDfilm = tagfilm.id;
          addFollowedFilms();
        }
      };
    }
  } catch (error) {
    console.log(error);
  }
}
listFilms();
async function addFollowedFilms() {
  try {
    let id = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", emailLogin)
      .get();
    console.log(IDfilm);
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(id.docs[0].id)
      .update({
        listFollowedFilm: firebase.firestore.FieldValue.arrayUnion(IDfilm),
      });
    swal({
      title: `Thêm vào danh sách thành công!`,
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#f8c086",
      confirmButtonText: "Ok",
      closeOnConfirm: false,
      closeOnCancel: false,
    });
  } catch (error) {
    console.log(error);
  }
}
