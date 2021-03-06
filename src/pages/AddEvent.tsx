import { collection, doc, getDocs, query, setDoc } from "@firebase/firestore";
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { firestore } from "../firebase";
import { EventItem } from "./Tab2";
import "./Tab2.css";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import jimp from "jimp";

export const resizeImage = async (url: string, maxSize: number) => {
  // Read the image.
  const image = await jimp.read(url);

  // Resize the image to width 150 and auto height.
  console.log(image.getWidth(), image.getHeight());
  const width = image.getWidth();
  const height = image.getHeight();
  if (width < height) {
    image.resize(jimp.AUTO, maxSize);
  } else image.resize(maxSize, jimp.AUTO);
  // Save and overwrite the image
  //await image.writeAsync("test/image.png");
  const imageUrl = await image.getBase64Async(jimp.MIME_JPEG);
  return {
    imageUrl,
    imageRatio: width / height,
  };
};

export async function urltoFile(
  url: string,
  filename: string,
  mimeType: string
) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

export const uploadFile = async (file: File) => {
  const { Upload } = require("upload-js");
  const upload = new Upload({
    apiKey: "public_FW25aknBG4VgSpCGGMeimpBsf9Qd",
  });
  const { fileUrl, fileId } = await upload.uploadFile({ file });
  return fileUrl;
};

const AddEvent: React.FC = () => {
  const [event, setEvent] = useState<EventItem>({
    description: "",
    media: [],
    timestamp: moment().format("YYYY/MM/DD"),
    title: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddImage = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 4,
        source: CameraSource.Photos,
        resultType: CameraResultType.Uri,
        correctOrientation: false,
      });

      const data = await resizeImage(photo.webPath!, 1024);
      let temp = { ...event };
      temp.media.push(data.imageUrl);
      setEvent(temp);
    } catch (e) {}
  };

  const handleAddEvent = async () => {
    setIsLoading(true);
    let temp: EventItem = { ...event };
    if (temp.media)
      for (let item of temp.media) {
        const file: File = await urltoFile(
          item,
          "UniLife-" + moment().valueOf() + ".jpeg",
          "image/jpeg"
        );
        const url = await uploadFile(file);
        temp.media[temp.media.indexOf(item)] = url;
      }

    await setDoc(doc(firestore, "unilife", moment().format()), {
      ...temp,
    });

    setEvent({
      description: "",
      media: [],
      timestamp: moment().format("YYYY/MM/DD"),
      title: "",
    });
    setIsLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonButton
          onClick={() =>
            setEvent({
              description: "",
              media: [],
              timestamp: moment().format("YYYY/MM/DD"),
              title: "",
            })
          }
        >
          Print
        </IonButton>
        <IonInput
          placeholder="Title"
          value={event.title}
          onIonChange={(e) => setEvent({ ...event, title: e.detail.value! })}
        />
        <IonInput
          placeholder="Description"
          value={event.description}
          onIonChange={(e) =>
            setEvent({ ...event, description: e.detail.value! })
          }
        />
        <IonDatetime
          placeholder="Timestamp"
          value={moment(event.timestamp).format()}
          onIonChange={(e) =>
            setEvent({
              ...event,
              timestamp: moment(e.detail.value).format("YYYY/MM/DD"),
            })
          }
        />
        <IonButton onClick={handleAddImage}>Add Image</IonButton>
        {event.media?.map((media, index) => (
          <IonImg src={media} key={index} style={{ width: 300 }} />
        ))}
        <IonButton onClick={handleAddEvent}>Submit</IonButton>

        <IonLoading isOpen={isLoading} />
      </IonContent>
    </IonPage>
  );
};

export default AddEvent;
