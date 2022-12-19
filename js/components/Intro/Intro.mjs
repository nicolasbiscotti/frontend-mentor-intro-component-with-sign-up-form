export default class Intro extends HTMLElement {
  constructor() {
    super();

    const reset = this.importCss("./css/reset.css");
    const general = this.importCss("./css/general.css");
    const utilities = this.importCss("./css/utilities.css");
    const style = this.importCss("./js/components/Intro/style.css");

    let intro = document.querySelector("#intro-root");
    let introContent = intro.content;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(reset, general, utilities, style);
    this.shadowRoot.appendChild(introContent.cloneNode(true));
  }

  connectedCallback() {

    const slot = this.shadowRoot.querySelector("article").querySelector("slot");
    console.log(slot);
    
    // const shadow = this.attachShadow({ mode: "open" });
    // const article = document.createElement("article");
    // article.setAttribute("class", "intro grid-group");
    // const title = document.createElement("h1");
    // if (this.hasAttribute("title")) {
    //   title.textContent = this.getAttribute("title");
    // } else {
    //   title.textContent = "This is an Intro Component";
    // }
    // const p = document.createElement("p");
    // p.setAttribute("class", "intro__paragraph");
    // if (this.hasAttribute("description")) {
    //   p.textContent = this.getAttribute("description");
    // } else {
    //   p.textContent = "This is a description of the Intro Componenet";
    // }
    // shadow.append(article);
    // this.append(article);
    // article.append(title, p);
  }

  importCss(path) {
    const element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("href", path);
    return element;
  }
}

customElements.define("intro-wc", Intro);
