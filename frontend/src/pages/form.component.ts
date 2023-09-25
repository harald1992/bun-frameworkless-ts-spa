import { FormSpecData } from "../interfaces/form-spec.interface";
import { $apiService } from "../services/apiService";

const template = /*html*/ `
   <h1>Form</h1>

   <div class="d-flex flex-column" id="formspec-navigation">Loading...</div>
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
      this.querySelector("#formspec-navigation")!.innerHTML = JSON.stringify(
        this.formSpec
      );
    }
  }

  async loadFormSpec() {
    const params = this.getHashParams();
    const formspecname = params.formspecname;

    this.formSpec = (await $apiService.getFormSpec(
      formspecname
    )) as FormSpecData;
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
