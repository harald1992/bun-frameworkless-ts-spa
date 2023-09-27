import {
  FormCell,
  HeaderOrEmptyCell,
  Table,
  TableRow,
} from "../interfaces/form-spec.interface";

const template = /*html*/ `
<table></table>

`;

export class FormTableComponent extends HTMLElement {
  get table(): Table {
    let dataStringified = this.getAttribute("data") || "";

    return JSON.parse(dataStringified);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = template;

    const tableHTML = this.querySelector("table");

    tableHTML!.innerHTML += this.table.rows.map((row: TableRow) => {
      return /*html*/ `
        <tr>${row.cols?.map((value: HeaderOrEmptyCell | FormCell) => {
          return /*html*/ `
            <td>${this.cellHTML(value)}</td>
          `;
        })}</tr>
      `;
    });
  }

  cellHTML(value: HeaderOrEmptyCell | FormCell) {
    if (value.cellType === "INPUT") {
      return /*html*/ `
    <input type="text">
  `;
    } else {
      return value.value || "";
    }
  }
}

window.customElements.define("app-form-table", FormTableComponent);
