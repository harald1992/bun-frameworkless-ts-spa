import {
  HeaderOrEmptyCell,
  FormCell,
} from "../../interfaces/form-spec.interface";

export class GenericInputComponent extends HTMLElement {
  get inputField(): FormCell {
    let dataStringified = this.getAttribute("data") || "";
    return JSON.parse(dataStringified) as FormCell;
  }

  get id() {
    return this.inputField.aspects.concept.localPart;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    console.log(this.inputField.inputType);

    let html = "";
    switch (this.inputField.inputType) {
      case "TEXT":
        html = `<input type="text" id="${this.id}"/>`;
        break;
      case "DATE":
        html = `<input type="data" id="${this.id}"/>`;
        break;
      case "INTEGER":
        html = `<input type="number" id="${this.id}"/>`;
        break;
      case "FLOAT":
        html = `<input type="number" id="${this.id}"/>`;
        break;
      case "CHOICE":
        // html = "choice";
        html = /*html*/ `
    <select  id="${this.id}">
        <option value="">--Selecteer een optie--</option>
        ${this.inputField.choices
          ?.map(
            (choice: { value: string; label: string }) =>
              `<option value="${choice.value}">${choice.label}</option>`
          )
          .join("")}
      </select>
   `;
        break;
      case "PERCENTAGE":
        html = `<input type="text" id="${this.id}"/>`;
        break;
      case "GYEAR":
        html = `<input type="number" id="${this.id}"/>`;
        break;
      default:
        html = `<input type="text" id="${this.id}"/>`;
        break;
    }

    this.innerHTML = html;
    console.log(html);
  }
}

window.customElements.define("app-generic-input", GenericInputComponent);
