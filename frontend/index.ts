import fetchUser from "./githubAPI";

declare const document: any;

(async () => {
  const userData = await fetchUser("harald1992");

  document.querySelector("h1").innerHTML = JSON.stringify(userData);
})();
