import {
  FormCell,
  HeaderOrEmptyCell,
  Table,
  TableRow,
} from "../interfaces/form-spec.interface";

const template = /*html*/ `
<table id="form-table"></table>
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

    const tableHTML = this.querySelector("#form-table");

    tableHTML!.innerHTML = this.table.rows
      .map((row: TableRow) => this.rowHTML(row))
      .join(""); // join to convert map array into separate items, and empty string as separator so it doesn't generate 10 comma's
  }

  rowHTML(row: TableRow) {
    return `
        <tr>${row.cols
          ?.map((value: HeaderOrEmptyCell | FormCell) => {
            return `<td>${this.cellHTML(value)}</td>`;
          })
          .join("")}
        </tr>
      `;
  }

  cellHTML(value: HeaderOrEmptyCell | FormCell) {
    if (value.cellType === "INPUT") {
      return `<input type="text">`;
    } else {
      return value.value || "";
    }
  }
}

window.customElements.define("app-form-table", FormTableComponent);
