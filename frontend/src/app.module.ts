import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer.component";
import { HeaderComponent } from "./components/header.component";
import { HomeComponent } from "./pages/home.component";
import { FormComponent } from "./pages/form.component";
import { PhotosComponent } from "./pages/photos.component";
import { NavigationAbstractComponent } from "./components/navigation-abstract.component";
import { PageAbstractComponent } from "./components/page-abstract.component";
import { FormSectionComponent } from "./components/form-section.component";
import { WebSocketComponent } from "./pages/websocket";
import { FormTableComponent } from "./components/form-table.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner.component";
import { GenericInputComponent } from "./components/input-components/generic-input.component";

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
  FormTableComponent,
  LoadingSpinnerComponent,
  GenericInputComponent,
];
