const template = /*html*/ `
    <a href="#">Home</a>

   <h1>Photos</h1>
`;

export class PhotosComponent extends HTMLElement {
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

window.customElements.define("app-photos", PhotosComponent);
// export default "<app-photos></app-photos>";
