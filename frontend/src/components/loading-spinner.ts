const template = /*html*/ `
    <div class="align-center-container">
        <div
            id="loading-spinner"
            class="spinner"
            aria-label="Er wordt data geladen"
        ></div>
    </div>

`;

export class LoadingSpinnerComponent extends HTMLElement {
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

window.customElements.define("app-loading-spinner", LoadingSpinnerComponent);
