import { $router } from "../archive/router";

const template = /*html*/ `
<header>
    <a href="#">Home</a>
    <a href="#photos">Photos</a> 
</header>
`;

export class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = template;
  }
}

window.customElements.define("app-header", HeaderComponent);
// export default "<app-header></app-header>";
