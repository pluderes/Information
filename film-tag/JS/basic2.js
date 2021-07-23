import { styleInLine } from "./style.js";

class basic2 extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.props = {
      avatar: "",
      href: "",
      name: "",
      age: "",
      time: "",
      like: "",
      id: "",
    };
  }

  connectedCallback() {
    //mounting
    const inner = `
        ${styleInLine}
        <div class="component col-4" style= "margin: 10px;">
          <div class="img">
            <img src="${this.props.avatar}" alt=""/>
          </div>
          <div class="block-description">
            <h6 class="title">
              <a href="${this.props.href}">${this.props.name}</a>
            </h6>
            <div class="desc_movie d-flex align-items-center my-2">
              <div class="badge badge-secondary mr-2">${this.props.age}+</div>
              <span class="text-white" style="font-weight: bold"
                >${this.props.time}</span
              >
            </div>
            <div class="btnPlay px-2 py-2">
              <span> <i class="fas fa-play mr-1"></i>PLAY NOW</span>
            </div>
          </div>
          <div class="actions">
            <ul class="list-inline p-0 m-0 music-play-lists">
              <li class="share">
                <span><i class="fas fa-share-alt"></i></span>
                <div class="share-box">
                  <div class="d-flex align-items-center">
                    <a
                      href="https://www.facebook.com/sharer?u=${this.props.href}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="share-ico"
                      tabindex="0"
                      ><i class="fab fa-facebook-f"></i
                    ></a>
                    <a
                      href="https://twitter.com/intent/tweet?text=Currentlyreading"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="share-ico"
                      tabindex="0"
                      ><i class="fab fa-twitter"></i
                    ></a>
                  </div>
                </div>
              </li>
              <li>
                <span><i class="fas fa-heart"></i></span>
                <span class="count-box">${this.props.like}</span>
              </li>
              <li>
                <span><i class="fas fa-plus" id="${this.props.id}"></i></span>
              </li>
            </ul>
          </div>
        </div>
    `;
    this.shadow.innerHTML += inner;
  }

  static get observedAttributes() {
    return ["avatar", "href", "name", "age", "time", "like", "id"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue) {
      this.props[name] = newValue;
    }
    // console.log(this.props);
  }

  disconnectedCallback() {
    // console.log("Unmouting");
  }
}

customElements.define("basic2-para", basic2);
