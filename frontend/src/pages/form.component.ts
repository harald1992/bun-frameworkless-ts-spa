import { FormSpecData } from "../interfaces/form-spec.interface";
import { $apiService } from "../services/apiService";

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
  formSpec!: FormSpecData;

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

    if (this.formSpec) {
      let navigationStringified = JSON.stringify(
        this.formSpec.formSpec.navigation
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
    const params = this.getHashParams();
    const formspecname = params.formspecname;

    this.formSpec = (await $apiService.getFormSpec(
      formspecname
    )) as FormSpecData;

    // console.log(this.formSpec);
  }

  getHashParams(): { formspecname: string } {
    const params = { formspecname: "" };

    let hashLocation = window.location.hash.replace("#", "");
    const regex = /\?(.*)/;
    const match = hashLocation.match(regex);

    if (!match) {
      return params;
    }
    const urlParams = match[1];
    const keyValuePairs = urlParams.split("&");

    // Loop through the key-value pairs and populate the 'params' object
    for (const pair of keyValuePairs) {
      const [key, value] = pair.split("=");
      (params as any)[key] = decodeURIComponent(value); // Decode URI-encoded values
    }

    return params;
  }
}

window.customElements.define("app-form", FormComponent);
