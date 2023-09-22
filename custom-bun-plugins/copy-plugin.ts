import { BunPlugin, PluginBuilder, plugin } from "bun";
import { cpSync, existsSync, mkdirSync, readFileSync, readdir } from "fs";

export const copyPlugin: BunPlugin = {
  name: "CUSTOM_COPY_PLUGIN",
  async setup(build: PluginBuilder) {
    if (!existsSync("dist")) {
      // create dist folder so bun.write does not error out when not existing
      mkdirSync("dist");
    }

    const file = readFileSync("frontend/index.html");
    await Bun.write("dist/index.html", file);

    cpSync("frontend/assets", "dist/assets", { recursive: true }); // copy assets folder
  },
};

// plugin({
//   name: "CUSTOM_COPY_PLUGIN2",
//   async setup(build) {
//     console.log("Copy-plugin.ts running");

//     console.log(build);
//   },
// });
