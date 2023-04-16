import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";

interface CustomHeaderProps {
  name?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = (props) => {
  let { name } = props;

  if (!name || name == '') {
    name = 'DenunCity';
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{name}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );

}


export default CustomHeader;