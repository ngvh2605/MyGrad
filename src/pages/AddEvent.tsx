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
import { Camera, CameraResultType } from "@capacitor/camera";
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

async function urltoFile(url: string, filename: string, mimeType: string) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

const AddEvent: React.FC = () => {
  const { Upload } = require("upload-js");
  const [event, setEvent] = useState<EventItem>({
    description: "",
    media: [],
    timestamp: moment().format("YYYY/MM/DD"),
    title: "",
  });

  const handleAddImage = async () => {
    Camera.pickImages({}).then((images) => {
      let temp: string[] = [];
      images.photos.forEach(async (image) => {
        const data = await resizeImage(image.webPath, 1024);
        temp.push(data.imageUrl);
      });
      setEvent({ ...event, media: temp });
    });
  };

  const handleAddEvent = async () => {
    let temp: EventItem = { ...event };
    if (temp.media)
      for (let item of temp.media) {
        const file: File = await urltoFile(
          item,
          moment().valueOf() + ".jpeg",
          "image/jpeg"
        );
        const url = await uploadFile(file);
        temp.media[temp.media.indexOf(item)] = url;
      }

    await setDoc(doc(firestore, "unilife", moment().format()), {
      ...temp,
    }).then(() => {
      setEvent({
        description: "",
        media: [],
        timestamp: moment().format("YYYY/MM/DD"),
        title: "",
      });
    });
  };

  const uploadFile = async (file: File) => {
    const upload = new Upload({
      apiKey: "public_FW25aknBG4VgSpCGGMeimpBsf9Qd",
    });
    const { fileUrl, fileId } = await upload.uploadFile({ file });
    return fileUrl;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonButton onClick={() => console.log(event)}>Print</IonButton>
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
      </IonContent>
    </IonPage>
  );
};

export default AddEvent;
