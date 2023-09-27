export const formspecNames = [
  "formspec-2023-kvk",
  "ontology.bzk-rpt-dpi-as-p-20200715",
  "ontology.bzk-rpt-dpi-asc-p-20200715",
  "ontology.bzk-rpt-dpi-hs-p-20200715",
  "ontology.bzk-rpt-dpi-js-p-20200715",
  "ontology.bzk-rpt-dpi-vr-p-20200715",
  "ontology.bzk-rpt-dpi-vrc-p-20200715",
  "ontology.bzk-rpt-dvi-as-p-20200318",
  "ontology.bzk-rpt-dvi-as-p",
  "ontology.bzk-rpt-dvi-asc-p-20200318",
  "ontology.bzk-rpt-dvi-asc-p",
  "ontology.bzk-rpt-dvi-hs-p-20200318",
  "ontology.bzk-rpt-dvi-hs-p",
  "ontology.bzk-rpt-dvi-js-p-20200318",
  "ontology.bzk-rpt-dvi-js-p",
  "ontology.bzk-rpt-dvi-vr-p-20200318",
  "ontology.bzk-rpt-dvi-vr-p",
  "ontology.bzk-rpt-dvi-vrc-p-20200318",
  "ontology.bzk-rpt-dvi-vrc-p",
  "ontology.kvk-rpt-c-p-20191211",
  "ontology.kvk-rpt-cvvof-g-p-20191211",
  "ontology.kvk-rpt-f-g-p-20191211",
  "ontology.kvk-rpt-h-m-p-20191211",
  "ontology.kvk-rpt-hp-m-p-20191211",
  "ontology.kvk-rpt-ozw-p-20191211",
  "ontology.kvk-rpt-p-k-p-20191211",
  "ontology.kvk-rpt-p-k-p-fiscal-initial-value-fiscal-20191211",
  "ontology.kvk-rpt-p-u-p-20191211",
  "ontology.kvk-rpt-p-u-p-fiscal-initial-value-fiscal-20191211",
  "ontology.kvk-rpt-s-p-20191211",
  "ontology.kvk-rpt-ti-p-20191211",
  "voorbeeld_formspec_voor_ons",
];

const template = /*html*/ `
   <h1>Homepage</h1>

   <div class="d-flex flex-column" id="formspec-links"></div>
`;

export class HomeComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = template;

    this.loadLinks();
  }

  loadLinks() {
    let links = "";
    formspecNames.forEach((name: string) => {
      links =
        links +
        /*html*/ `
        <a href="#form?formspecname=${name}"> ${name}</a>
      `;
    });
    this.querySelector("#formspec-links")!.innerHTML = links;
  }
}

window.customElements.define("app-home", HomeComponent);
// export default "<app-home></app-home>";
