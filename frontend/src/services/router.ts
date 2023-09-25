interface Route {
  // [key: string]: string;
  url: string;
  component: string;
}

const ROUTES: Route[] = [
  { url: "/", component: "<app-home></app-home>" },
  { url: "/photos", component: "<app-photos></app-photos>" },
];

class Router {
  constructor(private routes: Route[] = ROUTES) {}

  init() {
    const location = window.location.pathname;
    console.log(location);

    const route = this.routes.find((route: Route) =>
      location.includes(route.url)
    ) || { url: "*", component: "404: Not Found" };
    this.navigate(route.url);
  }

  navigate(url: string, addToHistory = true) {
    const historyRoute = "/#" + url;

    if (addToHistory) {
      history.pushState({ route: historyRoute }, "", historyRoute);
    }

    const routerOutlet = document.querySelector("router-outlet");
    if (!routerOutlet) {
      return;
    }

    const routesToNavigateTo = this.routes.filter(
      (route: Route) => url === route.url
    ) || { url: "*", component: "404: Not Found" };
    console.log(routesToNavigateTo);

    routerOutlet.innerHTML = routesToNavigateTo[0].component;

    routerOutlet.querySelectorAll("[router-link]").forEach((item: Element) => {
      item.addEventListener("click", (e) => {
        this.navigate(item.getAttribute("router-link") || "/");
      });
    });
  }
}

export const $router = new Router(ROUTES);
