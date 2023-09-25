import { $router } from "../services/router";

const template = /*html*/ `
<footer>
   Copyright: Harald
</footer>
`;

export class FooterComponent extends HTMLElement {
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

window.customElements.define("app-footer", FooterComponent);
// export default "<app-footer></app-footer>";
