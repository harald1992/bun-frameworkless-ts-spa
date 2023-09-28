import { PageAbstract } from "../interfaces/form-spec.interface";
import { getUrlParameters } from "../utils/hash-router-params";

const template = /*html*/ `
  <li>
      <a id="label" class="page-abstract-link nav-tree--left"></a>
  </li>
 
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
    // append currentParams with new pageId
    const currentParams = getUrlParameters(window.location.hash);
    const newParams = { ...currentParams, pageId: this.pageAbstract.pageId };
    const searchParams = new URLSearchParams(Object.entries(newParams));
    const location = window.location.hash.split("?");
    this.querySelector("#label")!.setAttribute(
      "href",
      location[0] + "?" + searchParams.toString()
    );
  }
}

window.customElements.define("app-page-abstract", PageAbstractComponent);
