import fetchUser from "./githubAPI";

declare const document: any;

(async () => {
  const userData = await fetchUser("harald1992");

  document.querySelector("#apicall").innerHTML = JSON.stringify(userData);
})();
