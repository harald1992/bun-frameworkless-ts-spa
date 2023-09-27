Bun.serve({
  port: 8000,

  error(error) {
    return new Response("oops");
  },

  tls: {
    // https: pem files still need to be generated though
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
  },

  fetch(req: Request) {
    return new Response("response");
  },
});

console.log(`tls server`);
