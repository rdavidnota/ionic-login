import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRow, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CustomHeader from "../../components/custom-header/CustomHeader";
import { getData, storage } from "../../storage/storage";

const HomePage: React.FC = () => {
    const history = useHistory();
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [profile, setProfile] = useState({
        name: "",
        lastname: "",
        address: "",
        username: "",
    });

    let [isReady, setIsReady] = useState(false);

    async function setData() {
        let response = await getData('isLoggedIn');
        if (response) {
            setIsLoggedIn(response.isLoggedIn);
        }
        else { setIsLoggedIn(false); }

        let responseProfile = await getData('profile');
        if (responseProfile) { setProfile(responseProfile); }
    }

    useIonViewWillEnter(async () => {
        await setData();
        setIsReady(true);
    })

    useEffect(() => {
        if (!isLoggedIn && isReady) {
            history.push('/login');
        }
    }, [])

    async function handlerClickLogout() {
        await storage.clear();
        history.push('/login', {});
    }
    async function handlerClickCerrar() {
        await storage.remove('isLoggedIn');
        history.push('/login', {});
    }

    return (
        <IonPage>
            <CustomHeader name='Home'></CustomHeader>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel>
                                Welcome {profile.name} {profile.lastname}
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton
                                onClick={() => { handlerClickLogout(); }}
                                color={"danger"}>
                                Logout
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                onClick={() => { handlerClickCerrar(); }}
                                color={"danger"}>
                                Close Session
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );

}

export default HomePage;