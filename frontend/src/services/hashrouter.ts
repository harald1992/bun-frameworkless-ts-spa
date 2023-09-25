interface Routes {
  [key: string | number]: {
    title: string;
    template: string;
    description?: string;
  };
}

const ROUTES: Routes = {
  404: {
    title: "404",
    template: "404: Not Found",
    description: "404 page",
  },
  "/": {
    title: "Home",
    template: "<app-home></app-home>",
    description: "Home page",
  },
  photos: {
    title: "Photos",
    template: "<app-photos></app-photos>",
    description: "Photos page",
  },
};

export const hashLocationHandler = async () => {
  let location = window.location.hash.replace("#", "");
  if (location.length === 0) {
    // if string has 0 characters
    location = "/";
  }

  const route = ROUTES[location] || ROUTES[404];

  document.title = route.title;
  const pageDescription = document.querySelector('meta[name="description"]');
  pageDescription?.setAttribute("content", route.description || "");
  console.log(pageDescription);

  const routerOutlet = document.querySelector("router-outlet");
  if (!routerOutlet) {
    return;
  }
  routerOutlet.innerHTML = route.template;
};

window.addEventListener("hashchange", hashLocationHandler);
