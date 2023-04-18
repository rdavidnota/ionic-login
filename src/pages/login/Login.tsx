import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonNav,
    IonNavLink,
    IonPage,
    IonRouterLink,
    IonRow,
    useIonAlert,
    useIonToast,
    useIonViewDidEnter,
    useIonViewWillEnter
} from "@ionic/react";
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio";
import { useEffect, useState } from "react";
import { loginHuella, loginUser, LoginUserResponse } from "../../services/login/login.services";
import { getData, storage } from "../../storage/storage";
import CustomHeader from "../../components/custom-header/CustomHeader";
import { ThemeDetection } from "@ionic-native/theme-detection/index";
import { useHistory } from "react-router";
import RegisterPage from "../register/register";


const LoginPage: React.FC = () => {
    let [user, setUser] = useState('');
    let [pass, setPass] = useState('');
    let [token, setToken] = useState('');
    let [isAvailableFinnger, setAvailableFinger] = useState(false);
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    let [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
    let [isReady, setIsReady] = useState(false);
    let history = useHistory();

    const [present] = useIonToast();
    const [presentAlert] = useIonAlert();

    const handlerUser = (value: any) => {
        setUser(value);
    };

    const handlerPass = (value: any) => {
        setPass(value);
    };

    const handleClick = async () => {
        let response: LoginUserResponse = await loginUser(user, pass);

        if (response.statusCode != 0) {
            present({
                message: response.message,
                duration: 1500,
            });
            return;
        }

        if (isAvailableFinnger) {
            presentAlert({
                header: 'Atencion!',
                message: 'Desea activar la opcion de autenticación por huella',
                buttons: [
                    {
                        text: 'OK',
                        handler: async () => {
                            if (true) {
                                storage.set('enableFingerLogin', true)
                                history.push('/home', {});
                            }
                        },
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Confirm fingerprint cancel');
                            storage.set('enableFingerLogin', false);
                            history.push('/home', {});
                        }
                    }
                ],
            })
        }
    }

    async function setData() {
        let response = await getData('isLoggedIn');
        if (response) { setIsLoggedIn(response.isLoggedIn); }
        else { setIsLoggedIn(false); }

        let responseCredentials = await getData('credentials');
        let responsetoken = await getData('token');
        if (responseCredentials) {
            setCredentials(responseCredentials);
            setUser(responseCredentials.user);
            setPass(responseCredentials.pass);
        } else {
            setCredentials({
                username: '',
                password: ''
            });
            setUser('');
            setPass('');
        }

        if (responsetoken) {
            setToken(responsetoken.token);
        }else{
            setToken('');
        }
    }

    async function availableFinnger() {
        let response = await FingerprintAIO.isAvailable()
            .then((value) => {
                if (value) {
                    setAvailableFinger(true)
                    return true;
                } else { return false; }
            })
            .catch(() => {
                return false;
            })
        return response;
    }

    useIonViewWillEnter(async () => {
        setIsReady(false);

        setAvailableFinger(false);
        await setData();

        setAvailableFinger(await availableFinnger());
        setIsReady(true);
    })

    async function handlerHuella() {
        let response = await loginHuella(token);

        if (response.statusCode != 0) {
            present({
                message: response.message,
                duration: 1500,
            });
            return;
        } else {
            history.push('/home', {});
        }
    }

    function solicitarHuella() {
        FingerprintAIO.show({
            title: 'Verifica tu identidad',
            description: 'DenunCity requiere verificar que eres tu para poder continuar'
        }).then(async (value) => {
            console.log(value);
            await handlerHuella();
        }).catch((reason) => {
            console.error(reason);
            present({
                message: 'No se pudo validar la huella, se bloqueo el telefono por 2 años, intente mas tarde.',
                duration: 5000,
            });
        });
    }

    function validarCredenciales(): boolean {
        if (credentials && credentials.username != '' && credentials.password != '')
            return true;
        else
            return false;
    }

    useEffect(() => {
        if (isAvailableFinnger && validarCredenciales() && isReady) {
            solicitarHuella();
        }
    }, [isReady])

    function handlerRegister(){
        history.push('/register')
    }

    return (
        <IonPage>
            <CustomHeader></CustomHeader>
            <IonContent fullscreen={true}>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardHeader>
                                    <img src='../../dist/assets/main-logo.png' />
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonItem>
                                        <IonInput
                                            value={user}
                                            onIonInput={(event) => { handlerUser(event.target.value) }}
                                            label="email"
                                            labelPlacement="floating"
                                            placeholder="user@mail.com"
                                            type="email">
                                        </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput
                                            value={pass}
                                            onIonInput={(event) => { handlerPass(event.target.value) }}
                                            label="pass"
                                            labelPlacement="floating"
                                            type="password">
                                        </IonInput>
                                    </IonItem>
                                </IonCardContent>
                                <IonFooter>
                                    <IonButton onClick={handleClick} expand="block">Sign in</IonButton>
                                </IonFooter>
                            </IonCard>

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonLabel  onClick={handlerRegister} >Register</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );

}

export default LoginPage;