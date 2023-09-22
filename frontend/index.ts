import fetchUser from "./githubAPI";

declare const document: any;

(async () => {
  const userData = await fetchUser("harald1992");
  // console.log(userData);
  // console.log("log");
  document.querySelector("h1").innerHTML = JSON.stringify(userData);
})();
