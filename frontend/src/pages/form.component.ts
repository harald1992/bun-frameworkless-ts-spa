import { FormSpecData } from "../interfaces/form-spec.interface";
import { $apiService } from "../services/apiService";
import { $storeProxy } from "../services/store";
import { getHashParams } from "../utils/hash-router-params";

const template = /*html*/ `
   <h1>Form</h1>
   
   <div class="horizontal-split">
     <div class="d-flex flex-column" id="formspec-navigation">Loading...</div>
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

    await this.loadFormSpec();

    this.render();
  }

  render() {
    this.innerHTML = template;

    if ($storeProxy.formSpec) {
      let navigationStringified = JSON.stringify(
        $storeProxy.formSpec.formSpec.navigation
      );
      navigationStringified = navigationStringified.replaceAll(
        /['"`]/g,
        "&quot;"
      );

      this.querySelector("#formspec-navigation")!.innerHTML = /*html*/ `
    <app-navigation-abstract data="${navigationStringified}"></app-navigation-abstract>
`;
    }
  }

  async loadFormSpec() {
    const params = getHashParams();
    const formspecname = params.formspecname;

    const formSpec = (await $apiService.getFormSpec(
      formspecname
    )) as FormSpecData;

    $storeProxy.formSpec = formSpec;
  }
}

window.customElements.define("app-form", FormComponent);
