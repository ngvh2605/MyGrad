import { collection, getDocs, query } from "@firebase/firestore";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { firestore } from "../firebase";
import "./Tab2.css";

interface Event {
  cover: string;
  description: string;
  media?: string[];
  timestamp: number;
  title: string;
}

const Tab2: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    (async () => {
      const temp: Event[] = [];
      const q = query(collection(firestore, "unilife"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data() as Event);
      });
      setEvents(temp);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
