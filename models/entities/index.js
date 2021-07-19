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
    let count = 0;
    data.docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().filmName);
      count++;

      rowContent.firstChild.firstChild.insertAdjacentHTML(
        "beforeend",
        `<basic-para
        avatar = "./img/02.jpg"
        href = "Href-Film2"
        name = "${doc.data().filmName}"
        age = "20"
        time = "3h 30m"
        like = "30"
      ></basic-para>`
      );
    });
    console.log(count);
  } catch (error) {
    console.log(error);
  }
}

getFilms();