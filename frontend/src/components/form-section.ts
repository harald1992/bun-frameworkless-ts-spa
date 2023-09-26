import { FormSection, PageAbstract } from "../interfaces/form-spec.interface";

const template = /*html*/ `
  <a id="label" class="page-abstract-link nav-tree--left"></a>
 
`;

export class FormSectionComponent extends HTMLElement {
  get formSection(): FormSection {
    let pageAbstractStringified =
      this.getAttribute("data") || JSON.stringify("");

    return JSON.parse(pageAbstractStringified);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    window.addEventListener("hashchange", (event: HashChangeEvent) => {
      console.log(event);
    });
  }

  render() {
    this.innerHTML = template;
  }
}

window.customElements.define("app-form-section", FormSectionComponent);
