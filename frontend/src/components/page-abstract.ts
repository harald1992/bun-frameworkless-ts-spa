import { PageAbstract } from "../interfaces/form-spec.interface";

const template = /*html*/ `
  <a id="label" class="page-abstract-link nav-tree--left"></a>
 
`;

export class PageAbstractComponent extends HTMLElement {
  get pageAbstract(): PageAbstract {
    let pageAbstractStringified =
      this.getAttribute("data") || JSON.stringify("");

    return JSON.parse(pageAbstractStringified);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = template;
    this.setLabel();
    this.setHref();
  }

  setLabel() {
    this.querySelector("#label")!.textContent = this.pageAbstract.label;
  }

  setHref() {
    console.log(window.location.hash);
    console.log(this.pageAbstract.pageId);

    this.querySelector("#label")!.setAttribute(
      "href",
      window.location.hash + "&pageId=" + this.pageAbstract.pageId
    );
  }
}

window.customElements.define("app-page-abstract", PageAbstractComponent);