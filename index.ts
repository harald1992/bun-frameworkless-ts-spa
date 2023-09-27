import { ServeOptions, Server } from "bun";
import { handleApiBackend } from "./backend/api-backend";
import { websocketServer } from "./backend/example-code/websocket-server";

const DIST = "./dist";
const DATABASE = "./database";
// const port = process.env.PORT || 3002;

const server = Server();

function Server(): Server {
  return Bun.serve({
    port: 3004,

    async fetch(req: Request) {
      const url = new URL(req.url);
      let file = undefined;
      if (url.pathname === "/" || url.pathname.includes("/#/")) {
        file = Bun.file("dist/index.html");
      } else if (url.pathname.includes("/api")) {
        return await handleApiBackend(req);
      } else {
        const filePath = DIST + url.pathname;
        file = Bun.file(filePath);
      }
      return new Response(file);
    },
    error(error: Error) {
      console.log(error);
      return new Response("oops!");
    },
  } as ServeOptions);
}

console.log(`Listening on ${server.hostname}:${server.port}`);

const ws = websocketServer();
