import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer";
import { HeaderComponent } from "./components/header";
import { HomeComponent } from "./pages/home.component";
import { FormComponent } from "./pages/form.component";
import { PhotosComponent } from "./pages/photos.component";
import { NavigationAbstractComponent } from "./components/navigation-abstract";
import { PageAbstractComponent } from "./components/page-abstract";
import { FormSectionComponent } from "./components/form-section";
import { WebSocketComponent } from "./pages/websocket";

/* Declare all components here so the customelements work */
export const components = [
  AppComponent,
  HeaderComponent,
  HomeComponent,
  PhotosComponent,
  FooterComponent,
  FormComponent,
  NavigationAbstractComponent,
  PageAbstractComponent,
  FormSectionComponent,
  WebSocketComponent,
];
