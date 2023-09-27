const template = /*html*/ `

   <h1>Websocked</h1>
<button id="websocket-button">Connect to websocket</button>
`;

export class WebSocketComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    this.querySelector("#websocket-button")?.addEventListener(
      "click",
      (event: Event) => {
        const host = window.location.host;
        // console.log(url);
        // const socket = new WebSocket(`ws://${host}/chat`);
        const socket = new WebSocket("ws://localhost:3000/chat");

        socket.addEventListener("message", (event) => {
          console.log(event.data);
        });

        setTimeout(() => {
          socket.send("Hello?");
        }, 100);
      }
    );
  }

  render() {
    this.innerHTML = template;
  }
}

window.customElements.define("app-websocket", WebSocketComponent);
