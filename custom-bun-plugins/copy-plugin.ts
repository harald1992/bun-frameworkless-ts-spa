import { BunPlugin, plugin } from "bun";
import { readFileSync } from "fs";

export const copyPlugin: BunPlugin = {
  name: "CUSTOM_COPY_PLUGIN",
  async setup(build) {
    console.log("Copying index.html");
    const file = readFileSync("frontend/index.html");
    // Todo: what if directory is empty, Bun.write does not create directory
    await Bun.write("dist/index.html", file);
  },
};

// plugin({
//   name: "CUSTOM_COPY_PLUGIN2",
//   async setup(build) {
//     console.log("Copy-plugin.ts running");

//     console.log(build);
//   },
// });
