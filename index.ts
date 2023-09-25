import { Server } from "bun";

const DIST = "./dist";
const DATABASE = "./database";
// const port = process.env.PORT || 3002;
let server = Server();

function Server(): Server {
  return Bun.serve({
    port: 3003,

    fetch(req: Request) {
      // console.log(req.url);

      const url = new URL(req.url);
      let file = undefined;
      if (url.pathname === "/" || url.pathname.includes("/#/")) {
        file = Bun.file("dist/index.html");
      } else if (url.pathname.includes("/api")) {
        let urlPathName = url.pathname.replace("/api", "");
        const filePath = DATABASE + urlPathName;
        file = Bun.file(filePath);
      } else {
        const filePath = DIST + url.pathname;
        file = Bun.file(filePath);
      }
      return new Response(file);
    },
    // error(error: Error) {
    //   console.log(error);
    // },
  });
}

console.log(`Listening on port ${server.port}`);
