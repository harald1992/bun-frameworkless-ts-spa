import { FormSection, PageAbstract } from "../interfaces/form-spec.interface";
import { $storeProxy } from "../services/store";
import { getHashParams } from "../utils/hash-router-params";

// const template = /*html*/ `

// `;

export class FormSectionComponent extends HTMLElement {
  formSection: FormSection | undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    window.addEventListener("hashchange", (event: HashChangeEvent) => {
      // console.log(event.newURL);
      // console.log(window.location);
      // Define the regex pattern
      // const pattern = /[^/]+$/;

      // // Match the pattern against the input string
      // const match = event.newURL.match(pattern);
      // console.log(match![0]);
      // if (match) {
      // const pageId = match[0] || "";

      // this.formSection = $storeProxy.formSpec?.formSpec.formSections.find(
      //   (formSection: FormSection) => {
      //     console.log(formSection.id, pageId);

      //     formSection.id.includes(pageId);
      //   }
      // );
      // console.log(this.formSection);
      const params = getHashParams();
      console.log(params);

      this.render();
      // }
    });
  }

  render() {
    this.innerHTML = /*html*/ `
      ${JSON.stringify(this.formSection)}
    `;
  }
}

window.customElements.define("app-form-section", FormSectionComponent);
