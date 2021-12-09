import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { doc, setDoc } from "@firebase/firestore";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { close, image } from "ionicons/icons";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { firestore } from "../firebase";
import { resizeImage, uploadFile, urltoFile } from "./AddEvent";
import { CardItem } from "./Tab3";

const AddGradCard = () => {
  const history = useHistory();
  const [card, setCard] = useState<CardItem>({
    message: "",
    name: "",
    image: "",
    ratio: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [presentAlert] = useIonAlert();

  const handleAddImage = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 1,
        source: CameraSource.Photos,
        resultType: CameraResultType.Uri,
      });

      const data = await resizeImage(photo.webPath!, 1024);

      setCard({ ...card, image: data.imageUrl, ratio: data.imageRatio });
    } catch (e) {}
  };

  const handlePostCard = async () => {
    setIsLoading(true);
    let temp: CardItem = { ...card };
    if (temp.image) {
      const file: File = await urltoFile(
        temp.image,
        "GradCard-" + moment().valueOf() + ".jpeg",
        "image/jpeg"
      );
      const url = await uploadFile(file);
      temp.image = url;
    }
    temp.message = encodeURI(card.message);

    await setDoc(doc(firestore, "gradcard", moment().format()), {
      ...temp,
    }).then(() => {
      setCard({ message: "", name: "", image: "", ratio: 0 });
      history.goBack();
    });

    presentAlert({
      message: "Thank you very much for being a part of my life story!",
      buttons: [{ text: "I love U" }],
    });
    setIsLoading(false);
  };

  return (
    <IonPage id="unilife-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                if (card.image || card.message || card.name)
                  presentAlert({
                    message: "Are you sure you want to cancel?",
                    buttons: [
                      {
                        text: "Yes",
                        handler: () => {
                          setCard({
                            message: "",
                            name: "",
                            image: "",
                            ratio: 0,
                          });
                          history.goBack();
                        },
                      },
                      { text: "No" },
                    ],
                  });
                else {
                  setCard({ message: "", name: "", image: "", ratio: 0 });
                  history.goBack();
                }
              }}
            >
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              disabled={!card || !card.image || !card.message || !card.name}
              onClick={handlePostCard}
            >
              Post
            </IonButton>
          </IonButtons>
          <IonTitle>Graduation Card</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton
          hidden
          onClick={() => {
            console.log(card);
          }}
        >
          Debug
        </IonButton>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">
              Your name<span className="text-required">*</span>
            </IonLabel>
            <IonInput
              placeholder="Type here"
              value={card.name}
              onIonChange={(e) => setCard({ ...card, name: e.detail.value! })}
              autocapitalize="words"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">
              Your card message<span className="text-required">*</span>
            </IonLabel>
            <IonTextarea
              placeholder="Write something for me"
              value={card.message}
              onIonChange={(e) =>
                setCard({ ...card, message: e.detail.value! })
              }
              autoGrow
              autocapitalize="sentences"
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">
              Finally, a photo of you or us
              <span className="text-required">*</span>
            </IonLabel>
            {card.image && (
              <IonCard>
                <IonImg src={card.image} />
              </IonCard>
            )}
          </IonItem>
          <IonButton expand="block" onClick={handleAddImage}>
            <IonIcon icon={image} slot="start" />
            {card.image ? "Change image" : "Select image"}
          </IonButton>
        </IonList>

        <IonLoading isOpen={isLoading} />
      </IonContent>
    </IonPage>
  );
};

export default AddGradCard;
