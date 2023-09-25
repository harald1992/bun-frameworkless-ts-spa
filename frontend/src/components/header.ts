import { $router } from "../services/router";

const template = /*html*/ `
<header>
    <a router-link="/">Home</a>
    <a router-link="/photos">Photos</a> 
</header>
`;

export class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    this.querySelectorAll("[router-link]").forEach((item: Element) => {
      item.addEventListener("click", (e) => {
        $router.navigate(item.getAttribute("router-link") || "/");
      });
    });
  }

  render() {
    this.innerHTML = template;
  }
}

window.customElements.define("app-header", HeaderComponent);
export default "<app-header></app-header>";
