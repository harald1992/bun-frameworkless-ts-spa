const template = /*html*/ `
<header>
<a href="/" routerLink>Home</a>
<a href="/pagetwo" routerLink>Page two</a>
</header>

<main>
<router-outlet></router-outlet>
<main>


<footer> Footer </footer>
`;

class AppComponent extends HTMLElement {}
