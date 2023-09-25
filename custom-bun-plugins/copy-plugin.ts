import { BunPlugin, PluginBuilder, plugin } from "bun";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFile,
  readFileSync,
  readdir,
  writeFile,
} from "fs";

export const copyPlugin: BunPlugin = {
  name: "CUSTOM_COPY_PLUGIN",
  async setup(build: PluginBuilder) {
    if (!existsSync("dist")) {
      // create dist folder so bun.write does not error out when not existing
      mkdirSync("dist");
    }

    copyIndexHtmlAndRemoveModule();
    copyStyles();
    copyAssetsFolder();

    copyFavicon();
  },
};

// plugin({
//   name: "CUSTOM_COPY_PLUGIN2",
//   async setup(build) {
//     console.log("Copy-plugin.ts running");

//     console.log(build);
//   },
// });
async function copyIndexHtmlAndRemoveModule() {
  const file = Bun.file("frontend/index.html");
  let fileText = await file.text();
  fileText = fileText.replace('type="module"', "");
  await Bun.write("dist/index.html", file);
}

function copyAssetsFolder() {
  cpSync("frontend/assets", "dist/assets", { recursive: true }); // copy assets folder
}

async function copyFavicon() {
  const file = Bun.file("favicon.ico");
  await Bun.write("dist/favicon.ico", file);
}

async function copyStyles() {
  const file = Bun.file("frontend/styles.css");
  await Bun.write("dist/styles.css", file);
}

// const file = readFile(
//   "frontend/index.html",
//   "utf-8",
//   (error: any, data: any) => {
//     var result = data.replace('type="module"', "");
//     // writeFile(someFile, result, "utf8", function (err) {
//     //   if (err) return console.log(err);
//     // });
//     writeFile("dist/index.html", result, "utf8", (err: any) => {
//       if (err) return console.log(err);
//     });
//   }
// );
