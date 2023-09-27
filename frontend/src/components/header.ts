import { $router } from "../archive/router";

const template = /*html*/ `
<header>
  <img src="assets/kvk.png" class="logo" alt="">
  <div class="buttons">
  <div class="user">
     <img src="assets/user.svg" alt="">
     <p>27381312</p>
    </div>
    <a href="#">Home</a>
    <a href="#photos">Photos</a> 
    <a href="#websocket">Websocket</a> 

  </div> 
  
</header>
`;

export class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = template;
  }
}

window.customElements.define("app-header", HeaderComponent);
// export default "<app-header></app-header>";
