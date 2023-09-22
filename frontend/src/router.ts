class Router {
  constructor() {}

  navigate(route: any, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    const routerOutlet = document.querySelector("router-outlet");
    if (!routerOutlet) {
      return;
    }

    switch (route) {
      case "/":
        routerOutlet.innerHTML = "Home";
        break;
      case "pagetwo":
        routerOutlet.innerHTML = "Page Two";

        break;
    }
  }
}
