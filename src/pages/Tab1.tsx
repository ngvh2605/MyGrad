import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonLabel,
  IonListHeader,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import moment from "moment";

import Countdown from "react-countdown";

const Tab1: React.FC = () => {
  const Completionist = () => <span>You are good to go!</span>;

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
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
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
    }
  };

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <div style={{ textAlign: "center" }}>
              <IonLabel>Save the date</IonLabel>
            </div>
            <Countdown
              date={moment("2021-12-15T15:30:00+11:00").toDate()}
              renderer={renderer}
            />
          </IonCardContent>
        </IonCard>

        <IonListHeader>My Unilife</IonListHeader>
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

              // border: "2px solid #f8f8f8",
              // borderRadius: 8,
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
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
