import { collection, getDocs, query } from "@firebase/firestore";
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { firestore } from "../firebase";
import "./Tab2.css";

export interface EventItem {
  description: string;
  media?: string[];
  timestamp: string;
  title: string;
}

const Tab2: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    (async () => {
      const temp: EventItem[] = [];
      const q = query(collection(firestore, "unilife"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data() as EventItem);
      });
      setEvents(temp);
    })();
  }, []);

  const EventCard = ({ event }: { event: EventItem }) => (
    <IonCard>
      <IonCardContent>
        <IonItem lines="none">
          <IonNote slot="start">
            <div style={{ textAlign: "center" }}>
              <IonText>
                <p>{moment(event.timestamp).format("MMM")}</p>
                <h2 style={{ fontSize: "x-large" }}>
                  <b>{moment(event.timestamp).format("DD")}</b>
                </h2>
                <p>{moment(event.timestamp).format("YYYY")}</p>
              </IonText>
            </div>
          </IonNote>
          <IonNote slot="start">
            <div className="vl"></div>
          </IonNote>
          <IonGrid>
            <IonRow>
              <div>
                <IonCardSubtitle color="primary">{event.title}</IonCardSubtitle>
                <IonLabel text-wrap>{event.description}</IonLabel>
              </div>
            </IonRow>
            <IonRow>
              {event.media?.map((item, index) => (
                <IonThumbnail
                  style={{
                    marginTop: 8,
                    marginRight: 8,
                  }}
                  key={index}
                >
                  <IonImg src={item} />
                </IonThumbnail>
              ))}
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Unilife</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Unilife</IonTitle>
          </IonToolbar>
        </IonHeader>

        {events &&
          events.length > 0 &&
          events
            .sort((a, b) => {
              return (
                moment(b.timestamp).valueOf() - moment(a.timestamp).valueOf()
              );
            })
            .map((event, index) => <EventCard event={event} key={index} />)}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
