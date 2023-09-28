import {
  FormSection,
  FormSectionControl,
  PageAbstract,
  TableControl,
} from "../interfaces/form-spec.interface";
import { $store } from "../services/store";
import { getHashParams, getUrlParameters } from "../utils/hash-router-params";
import { stringifyAndEscape } from "../utils/stringify-and-escape";

const template = /*html*/ `
<h1 id="form-title"></h1>
<div id="form-sub-sections"></div>
`;

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

      // console.log(this.formSection);
      const params: { formspecname: string; pageId: string } = getUrlParameters(
        window.location.hash
      ) as { formspecname: string; pageId: string };

      this.formSection = $store.formSpec?.formSpec.formSections.find(
        (formSection: FormSection) => formSection.id.includes(params.pageId)
      );
      this.render();
      // }
    });
  }

  render() {
    this.innerHTML = template;

    this.querySelector("#form-title")!.textContent = /*html*/ `
    ${this.formSection?.name}
    `;

    const formSubSections = this.querySelector("#form-sub-sections");

    this.formSection?.controls.forEach((control: FormSectionControl) => {
      formSubSections!.innerHTML += /*html*/ `
    <h2>${control.name || ""}</h2>
    ${control.controls.map((control: TableControl) => {
      return `<app-form-table data="${stringifyAndEscape(
        control.table
      )}"></app-form-table>`;
    })}
    `;
    });
  }
}

window.customElements.define("app-form-section", FormSectionComponent);
