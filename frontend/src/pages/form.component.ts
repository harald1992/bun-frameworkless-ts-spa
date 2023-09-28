import { FormSpecData } from "../interfaces/form-spec.interface";
import { $apiService } from "../services/apiService";
import { $store } from "../services/store";
import { getHashParams } from "../utils/hash-router-params";
import { stringifyAndEscape } from "../utils/stringify-and-escape";

const template = /*html*/ `
   <h1>Form</h1>
   
   <div class="horizontal-split">
     <div class="d-flex flex-column" id="formspec-navigation"><app-loading-spinner></app-loading-spinner></div>
     <div class="form" id="formspec-form">
     <app-form-section></app-form-section>
     </div>
  </div>
`;

export class FormComponent extends HTMLElement {
  // formSpec!: FormSpecData;

  constructor() {
    super();
  }

  async connectedCallback() {
    this.render();
    $store.formSpec = undefined;
    await this.loadFormSpec();

    this.render();
  }

  render() {
    this.innerHTML = template;

    if ($store.formSpec) {
      console.log($store.formSpec);

      const navigationStringified = stringifyAndEscape(
        $store.formSpec.formSpec.navigation
      );

      this.querySelector("#formspec-navigation")!.innerHTML = /*html*/ `
    <app-navigation-abstract data="${navigationStringified}"></app-navigation-abstract>
      `;

      setTimeout(() => {
        (
          this.querySelector(".page-abstract-link") as HTMLAnchorElement
        )?.click();
      });
    }
  }

  async loadFormSpec() {
    const params = getHashParams();
    const formspecname = params.formspecname || "";

    const formSpec = (await $apiService.getFormSpec(
      formspecname
    )) as FormSpecData;

    $store.formSpec = formSpec;
  }
}

window.customElements.define("app-form", FormComponent);
