let params = new URL(document.location).searchParams.get("kw");
params = params.replace(/-/g, " ");

let divResult = document.getElementById("rowContent");

let kw = localStorage.getItem("kw");

let listResult = [];

async function searchFilm() {
  try {
    const searchResult = await firebase.firestore().collection("films").get();
    // console.log(searchResult.size);
    for (let i = 0; i < searchResult.size; i++) {
      let name = searchResult.docs[i].data().filmName;
      if (name.search(kw) >= 0) {
        listResult.push(searchResult.docs[i].id);
      }
    }
    for (let i = 0; i < listResult.length; i++) {
      searchResult.docs.forEach((doc) => {
        if (doc.id == listResult[i]) {
          // console.log(doc.id, ` : `, listIDFilm[i]);
          divResult.insertAdjacentHTML(
            "beforeend",
            `<basic-param style="width: 335px";"
            avatar = "./img/02.jpg"
            href = "./movie-intro.html"
            name = "${doc.data().filmName}"
            age = "${doc.data().age}"
            time = "${doc.data().time} m"
            like = "${doc.data().vote}"
            id = "${doc.id}"
          ></basic-param>`
          );
          let a = document.getElementById(`${doc.id}`);
          a.id = "";
          console.log(a);
        }
      });
      console.log("----------------------------------------------");
    }
  } catch (error) {
    console.log(error);
  }
}
searchFilm();
