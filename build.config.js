import { copyPlugin } from "./custom-bun-plugins/copy-plugin";

const build = await Bun.build({
  entrypoints: ["./frontend/index.ts"],
  outdir: "./dist",
  minify: true,
  plugins: [copyPlugin],
  // loader
});

// console.log(build);

if (!build.success) {
  //   console.error("Build failed");
  //   for (const message of result.logs) {
  //     // Bun will pretty print the message object
  //     console.error(message);
  //   }
  throw new AggregateError(result.logs, "Build failed"); // should be the same as above
}
