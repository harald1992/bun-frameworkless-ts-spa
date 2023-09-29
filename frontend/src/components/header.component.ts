const template = /*html*/ `
<header>
  <a href="#">
    <img src="assets/kvk.png" class="logo" alt="">
  </a>  
  <div class="buttons">
  <div class="user">
     <img src="assets/user.svg" alt="">
     <p>27381312</p>
    </div>
    <a class="nav-link" href="#">Home</a>
    <a class="nav-link" href="#photos">Photos</a> 
    <a class="nav-link" href="#websocket">Websocket</a> 

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
