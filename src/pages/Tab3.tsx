import { query } from "@firebase/firestore";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { collection, getDocs } from "firebase/firestore";
import { add, mail } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { firestore } from "../firebase";
import AddGradCard from "./AddGradCard";
import "./Tab3.css";

export interface CardItem {
  image: string;
  message: string;
  name: string;
  ratio: number;
}

const Tab3: React.FC = () => {
  const history = useHistory();
  const [cards, setCards] = useState<CardItem[]>([]);

  useEffect(() => {
    (async () => {
      const temp: CardItem[] = [];
      const q = query(collection(firestore, "gradcard"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data() as CardItem);
      });
      setCards(temp);
    })();
  }, []);

  const GradCard = ({ card }: { card: CardItem }) => {
    const [isLoad, setIsLoad] = useState(true);

    return (
      <IonCard>
        {isLoad ? (
          <IonSkeletonText
            animated
            style={{
              width: window.innerWidth - 32,
              height:
                window.innerWidth - 32 > 680
                  ? 648 / card.ratio
                  : (window.innerWidth - 32) / card.ratio,
              maxWidth: 680,
              margin: "0 auto",
            }}
          />
        ) : (
          <></>
        )}
        <IonImg
          src={card.image}
          onIonImgDidLoad={() => setIsLoad(false)}
          style={isLoad ? { opacity: 0, width: 0, height: 0 } : { opacity: 1 }}
        />
        <IonCardContent>
          <IonCardSubtitle color="primary">{card.name}</IonCardSubtitle>
          <IonLabel text-wrap style={{ whiteSpace: "pre-wrap" }}>
            {decodeURI(card.message)}
          </IonLabel>
        </IonCardContent>
      </IonCard>
    );
  };

  return (
    <IonPage id="grad-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Graduation Card</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Graduation Card</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 3 page" /> */}

        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <IonButton
            expand="block"
            className="ion-padding-horizontal ion-margin-top"
            onClick={() => history.push("/addnew")}
          >
            <IonIcon icon={mail} slot="start" />
            Write me a Graduation Card
          </IonButton>

          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => <GradCard card={card} key={index} />)}
        </div>

        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          onClick={() => history.push("/addnew")}
        >
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
