import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonListHeader,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonSlide,
  IonSlides,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import moment from "moment";

import Countdown from "react-countdown";
import { add, logoLinkedin, mail, mailOutline } from "ionicons/icons";
import { useState } from "react";
import AddGradCard from "./AddGradCard";
import { useHistory } from "react-router";

const Tab1: React.FC = () => {
  const history = useHistory();

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    completed: boolean;
  }) => {
    return (
      <IonGrid>
        <IonRow>
          <IonCol>
            <div style={{ textAlign: "center" }}>
              <p>
                <IonText style={{ fontSize: "x-large" }} color="dark">
                  <b>{days}</b>
                </IonText>
              </p>
              <IonLabel color="dark">Days</IonLabel>
            </div>
          </IonCol>
          <IonCol>
            <div style={{ textAlign: "center" }}>
              <p>
                <IonText style={{ fontSize: "x-large" }} color="dark">
                  <b>{hours}</b>
                </IonText>
              </p>
              <IonLabel color="dark">Hours</IonLabel>
            </div>
          </IonCol>
          <IonCol>
            <div style={{ textAlign: "center" }}>
              <p>
                <IonText style={{ fontSize: "x-large" }} color="dark">
                  <b>{minutes}</b>
                </IonText>
              </p>
              <IonLabel color="dark">Min</IonLabel>
            </div>
          </IonCol>
          <IonCol>
            <div style={{ textAlign: "center" }}>
              <p>
                <IonText style={{ fontSize: "x-large" }} color="dark">
                  <b>{seconds}</b>
                </IonText>
              </p>
              <IonLabel color="dark">Sec</IonLabel>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  };

  const CoverImage = () => {
    const [coverLoad, setCoverLoad] = useState(true);

    return (
      <IonCard>
        <IonThumbnail
          style={{
            width: window.innerWidth - 32,
            height: ((window.innerWidth - 32) * 9) / 16,
          }}
        >
          <IonImg
            src="https://files.upload.io/FW25aknGfyL9jZDPisgZM4A"
            onIonImgDidLoad={() => {
              console.log("run");
              setCoverLoad(false);
            }}
            style={
              coverLoad ? { opacity: 0, width: 0, height: 0 } : { opacity: 1 }
            }
          />
          {coverLoad && (
            <IonSkeletonText
              animated
              style={{
                width: window.innerWidth - 32,
                height: ((window.innerWidth - 32) * 9) / 16,
                margin: 0,
              }}
            />
          )}
        </IonThumbnail>
      </IonCard>
    );
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home Page</IonTitle>
          </IonToolbar>
        </IonHeader>

        <CoverImage />
        <IonCard>
          <IonCardContent>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <IonCardSubtitle color="primary">
                Vịt Graduation Photoshoot
              </IonCardSubtitle>
            </div>

            <Countdown
              date={moment("2021-12-15T15:30:00+11:00").toDate()}
              renderer={renderer}
            />
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <IonCardSubtitle color="primary">More Info</IonCardSubtitle>
            </div>
            <IonLabel text-wrap>
              Dear friends and network,
              <br />
              It is my pleasure to specially invite you to join me for a
              Graduation Photoshoot
              <br />
              When:{" "}
              <IonText className="text-highlight">
                Wednesday (15th December) from 3pm to 4.30pm
              </IonText>
              <br />
              Where:{" "}
              <IonText className="text-highlight">
                University of Wollongong (Duck Pond Lawn meet up point)
              </IonText>
              <br />
              Please be noticed that you will be required to check-in using{" "}
              <IonText className="text-highlight">
                Service NSW QR Code
              </IonText>{" "}
              and you will need to bring your{" "}
              <IonText className="text-highlight">
                COVID-19 vaccination certificate
              </IonText>
              <br />
              <IonText className="text-highlight">A face mask</IonText> is
              required for all indoor areas on campus
              <br />
              The best parking will be in the{" "}
              <IonText className="text-highlight">
                P2 Main car park
              </IonText>{" "}
              (free of charge)
              <br />
              Best regards,
              <br />
              Viet Hoang Nguyen.
            </IonLabel>
          </IonCardContent>
        </IonCard>
        <IonButton
          expand="block"
          className="ion-padding-horizontal"
          onClick={() => history.push("/addnew")}
        >
          <IonIcon icon={mail} slot="start" />
          Write me a Graduation Card
        </IonButton>
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

        {/* <IonListHeader>My UniLife</IonListHeader>
        <IonGrid className="ion-no-padding">
          <IonRow className="ion-padding-horizontal">
            <IonCol className="ion-no-padding">
              <IonCard
                className="ion-no-margin"
                style={{ marginRight: 8, marginTop: 8 }}
              >
                <IonImg src="https://ionicframework.com/docs/assets/img/guides/react/first-app/live-reload.gif" />
                <IonCardContent>
                  <IonLabel text-wrap>Hello how are you looking</IonLabel>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol className="ion-no-padding">
              <IonCard
                className="ion-no-margin"
                style={{ marginLeft: 8, marginTop: 8 }}
              >
                <IonImg src="https://ionicframework.com/docs/assets/img/guides/react/first-app/live-reload.gif" />
                <IonCardContent>
                  <IonLabel text-wrap>Hello how are you looking</IonLabel>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonSlides
          options={{ slidesPerView: "auto", zoom: false, grabCursor: true }}
        >
          <IonSlide
            style={{
              width: 150,
            }}
          >
            <IonCard>
              <IonImg
                style={{ pointerEvents: "none" }}
                src="https://via.placeholder.com/150"
              />
              <IonCardContent style={{ padding: 8 }}>
                <IonLabel text-wrap>Hello how are you looking</IonLabel>
              </IonCardContent>
            </IonCard>
          </IonSlide>
        </IonSlides> */}
        <br />
        <br />
        <br />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
