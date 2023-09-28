export function websocketServer() {
  return Bun.serve({
    port: 4000, // default is also 3000

    fetch(req, server) {
      if (server.upgrade(req)) {
        return;
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
      open() {
        // when connection is received
        console.log("A new client connected");
      },
      message(ws, message) {
        // function that runs when a message has been received
        console.log(message);
        ws.sendText("Hello from Bun websocket");
      },

      // close: // when client closes connection
      // drain: // when socket is ready to receive more dataj
    },
  });
}
