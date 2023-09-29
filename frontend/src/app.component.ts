import { hashLocationHandler } from "./services/hashrouter";
import { $router } from "./archive/archive_router";

const template = /*html*/ `
<div class="page-wrap">
    <app-header></app-header>

  <main>
      <router-outlet></router-outlet>
  </main>

  <app-footer></app-footer>
</div>
`;

export class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.render();

    hashLocationHandler();
  }

  connectedCallback() {
    // this.render();
  }

  render() {
    this.innerHTML = template;
  }
}

window.customElements.define("app-component", AppComponent);
export default "<app-component></app-component>";
