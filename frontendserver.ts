import { Server } from "bun";

const BASE_PATH = "./dist";

// const port = process.env.PORT || 3002;
let frontendServer = Server();

function Server(): Server {
  return Bun.serve({
    port: 3003,

    fetch(req: Request) {
      const url = new URL(req.url);
      let file = undefined;
      if (url.pathname === "/" || url.pathname.includes("/#/")) {
        file = Bun.file("dist/index.html");
      } else {
        const filePath = BASE_PATH + new URL(req.url).pathname;
        file = Bun.file(filePath);
      }
      return new Response(file);
    },
    // error(error: Error) {
    //   console.log(error);
    // },
  });
}

console.log(`Frontend Listening on port ${frontendServer.port}`);
