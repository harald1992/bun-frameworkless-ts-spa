interface Routes {
  [key: string | number]: Route;
}

interface Route {
  title: string;
  template: string;
  description?: string;
}

const ROUTES: Routes = {
  404: {
    title: "404",
    template: "404: Not Found",
    description:
      "This page states that the page that is being navigated to does not exist",
  },
  "/": {
    title: "Home",
    template: "<app-home></app-home>",
    description:
      "This is the landing page containing links to other parts in the website",
  },
  photos: {
    title: "Photos",
    template: "<app-photos></app-photos>",
    description: "This page contains all photos from X",
  },
  form: {
    title: "Formspec",
    template: "<app-form></app-form>",
    description: "This page contains a form for a taxonomy",
  },
  websocket: {
    title: "Web Socket",
    template: "<app-websocket></app-websocket>",
    description: "This page contains a websocket",
  },
};

let previousRoute: Route = { title: "", template: "", description: "" };

export const hashLocationHandler = async (event?: HashChangeEvent) => {
  let location = window.location.hash.replace("#", "");

  if (location.length === 0) {
    location = "/"; // if string has 0 characters
  }
  let route: Route = ROUTES[404];

  for (const page in ROUTES) {
    if (location.includes(page)) {
      route = ROUTES[page];
    }
  }

  if (previousRoute && previousRoute === route) {
    // todo: use event.oldURL and event.newURL
    return;
  }
  // const route = ROUTES[location] || ROUTES[404];

  document.title = route.title;

  const pageDescription = document.querySelector('meta[name="description"]');
  pageDescription?.setAttribute("content", route.description || "");

  const routerOutlet = document.querySelector("router-outlet");
  if (!routerOutlet) {
    return;
  }
  routerOutlet.innerHTML = route.template;

  previousRoute = route;
};

window.addEventListener("hashchange", hashLocationHandler);
