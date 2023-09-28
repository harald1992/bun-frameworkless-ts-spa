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
  <div id="form-sub-sections">
</div>

`;

export class FormSectionComponent extends HTMLElement {
  formSection: FormSection | undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.getFormSectionFromUrl();
    this.render();

    window.addEventListener("hashchange", this.hashChangeEvent);
  }

  hashChangeEvent = () => {
    this.getFormSectionFromUrl();
    this.render();
  };

  getFormSectionFromUrl() {
    const params: { formspecname: string; pageId: string } = getUrlParameters(
      window.location.hash
    ) as { formspecname: string; pageId: string };

    this.formSection = $store.formSpec?.formSpec.formSections.find(
      (formSection: FormSection) => formSection.id.includes(params.pageId)
    );
  }

  render() {
    this.innerHTML = template;

    console.log(this.formSection);

    this.querySelector("#form-title")!.innerHTML = /*html*/ `
    ${this.formSection?.name || ""} 
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

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.hashChangeEvent);
  }
}

window.customElements.define("app-form-section", FormSectionComponent);
