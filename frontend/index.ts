import { components } from "./src/app.module";
import fetchUser from "./src/services/githubAPI";

// declare vanillaJS webcomponents
components;

declare const document: any;

(async () => {
  // const userData = await fetchUser("harald1992");
  // document.querySelector("#apicall").innerHTML = JSON.stringify(userData);
})();
