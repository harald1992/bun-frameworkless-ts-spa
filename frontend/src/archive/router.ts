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
  routerLinkEvent = (event: Event) => {
    event.preventDefault();
    if (!event.target) return;
    this.navigate((event.target as HTMLElement).getAttribute("href") || "/");
  };

  constructor(private routes: Route[] = ROUTES) {}

  init() {
    const location = window.location.pathname;

    const routes = this.routes.filter((route: Route) =>
      location.includes(route.url)
    );

    let route = { url: "*", component: "404: Not Found" };

    if (routes.length === 0) {
      // do nothing
    } else if (routes.length === 1) {
      route = routes[0];
    } else if (routes.length > 1) {
    }
    // this.navigate(route.url);
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

    const routeToNavigateTo = this.routes.find(
      (route: Route) => url === route.url
    ) || { url: "*", component: "404: Not Found" };

    routerOutlet.innerHTML = routeToNavigateTo.component;

    setTimeout(() => {
      this.refreshRouterLinks();
    }, 100);
    // this.refreshRouterLinks();
  }

  refreshRouterLinks() {
    document.querySelectorAll("[router-link]").forEach((item: Element) => {
      item.removeEventListener("click", this.routerLinkEvent);
      item.addEventListener("click", this.routerLinkEvent);
    });
  }
}

export const $router = new Router(ROUTES);
