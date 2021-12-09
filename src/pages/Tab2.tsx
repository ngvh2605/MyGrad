import { collection, getDocs, query } from "@firebase/firestore";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoLinkedin } from "ionicons/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { firestore } from "../firebase";
import "./Tab2.css";

export interface EventItem {
  description: string;
  media: string[];
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

  const EventCard = ({ event }: { event: EventItem }) => {
    const [isLoad, setIsLoad] = useState(true);

    return (
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
                  <IonCardSubtitle color="primary">
                    {event.title}
                  </IonCardSubtitle>
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
                    {isLoad ? <IonSkeletonText animated /> : <></>}
                    <IonImg
                      src={item}
                      onIonImgDidLoad={() => {
                        if (
                          event.media &&
                          event.media.length > 0 &&
                          index === event.media.length - 1
                        )
                          setIsLoad(false);
                      }}
                      style={
                        isLoad
                          ? { opacity: 0, width: 0, height: 0 }
                          : { opacity: 1 }
                      }
                    />
                  </IonThumbnail>
                ))}
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonCardContent>
      </IonCard>
    );
  };

  return (
    <IonPage id="unilife-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>My UniLife</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My UniLife</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton
          expand="block"
          className="ion-padding-horizontal ion-margin-top"
          color="tertiary"
          href="https://www.linkedin.com/in/vithong"
          target="_blank"
        >
          <IonIcon icon={logoLinkedin} slot="start" />
          Recommend / Endorse me
        </IonButton>

        <div style={{ textAlign: "center" }}>
          <br />
          <IonLabel text-wrap>
            <i>Still updating my story, stay tuned 😉</i>
          </IonLabel>
        </div>
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
