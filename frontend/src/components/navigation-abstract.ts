import {
  NavigationAbstract,
  PageAbstract,
} from "../interfaces/form-spec.interface";

const template = /*html*/ `
<ul>
  <button id="label" class="navigation-button nav-tree--left"></button>
  <div class="d-flex flex-column nav-tree" id="children"></div>
</ul>
`;

export class NavigationAbstractComponent extends HTMLElement {
  get navigationAbstract(): NavigationAbstract {
    let navigationAbstractStringified =
      this.getAttribute("data") || JSON.stringify("");

    return JSON.parse(navigationAbstractStringified);
  }

  #isExpanded = false;

  constructor() {
    super();
  }

  toggleIsExpanded() {
    this.#isExpanded = !this.#isExpanded;
    this.render();
  }

  connectedCallback() {
    this.#isExpanded = this.navigationAbstract.expanded;
    this.render();
  }

  render() {
    this.innerHTML = template;
    this.setLabel();

    if (this.#isExpanded) {
      this.loadChildAbstracts();
    }

    this.querySelector("#label")?.addEventListener("click", (e) => {
      this.toggleIsExpanded();
    });
  }

  setLabel() {
    const text = this.navigationAbstract.label;
    const arrow = this.#isExpanded ? "&darr;" : "&uarr;";
    this.querySelector("#label")!.innerHTML = text + arrow;
  }

  loadChildAbstracts() {
    const childrenEl = this.querySelector("#children");
    let childrenTemplate = "";

    this.navigationAbstract?.children?.forEach(
      (item: NavigationAbstract | PageAbstract) => {
        let data = JSON.stringify(item);
        data = data.replaceAll(/['"`]/g, "&quot;");

        if (item.type === "NAVIGATION_ABSTRACT") {
          childrenTemplate += /*html*/ `<app-navigation-abstract data="${data}"></app-navigation-abstract>`;
        } else {
          childrenTemplate += /*html*/ `<app-page-abstract data="${data}"></app-page-abstract>`;
        }
      }
    );

    childrenEl!.innerHTML = childrenTemplate;
  }
}

window.customElements.define(
  "app-navigation-abstract",
  NavigationAbstractComponent
);
