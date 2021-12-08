import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AddEvent from "./pages/AddEvent";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Tab1 />
          </Route>
          <Route exact path="/unilife">
            <Tab2 />
          </Route>
          <Route path="/gradcard">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route exact path="/secret/add">
            <AddEvent />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={triangle} />
            <IonLabel>Home Page</IonLabel>
          </IonTabButton>
          <IonTabButton tab="gradcard" href="/gradcard">
            <IonIcon icon={square} />
            <IonLabel>Graduation Card</IonLabel>
          </IonTabButton>
          <IonTabButton tab="unilife" href="/unilife">
            <IonIcon icon={ellipse} />
            <IonLabel>My Unilife</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
