const template = /*html*/ `
   <h1>Homepage</h1>
`;

export class HomeComponent extends HTMLElement {
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

window.customElements.define("app-home", HomeComponent);
// export default "<app-home></app-home>";
