import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, useIonToast } from "@ionic/react";
import { laptopSharp } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import CustomHeader from "../../components/custom-header/CustomHeader";
import { register, RegisterUserResponse } from "../../services/login/login.services";



const RegisterPage: React.FC = () => {
    const [_name, setName] = useState('');
    const [_lastname, setLastName] = useState('');
    const [_address, setAddress] = useState('');
    const [_username, setUsername] = useState('');
    const [_password, setPassword] = useState('');
    const [present] = useIonToast();
    let history = useHistory();

    function handlerName(name: any) { setName(name); }
    function handlerLastName(lastname: any) { setLastName(lastname); }
    function handlerAddress(address: any) { setAddress(address); }
    function handlerUsername(username: any) { setUsername(username); }
    function handlerPassword(password: any) { setPassword(password); }

    async function handlerClick(){
        let response:RegisterUserResponse = await register(_name, _lastname, _address,_username,_password);

        if(response.statusCode != 0){
            present({
                message: 'No se puede registrar en estos momentos, intente en unos momentos.',
                duration: 5000,
            });
        }else{
            history.push('/login')
        }
    }

    function handlerLogin(){
        history.push('/login')
    }

    return (
        <IonPage>
            <CustomHeader></CustomHeader>
            <IonContent fullscreen={true}>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput
                                    value={_name}
                                    onIonInput={(event) => { handlerName(event.target.value) }}
                                    label="Name:"
                                    labelPlacement="floating"
                                    placeholder="Jhon">
                                </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    value={_lastname}
                                    onIonInput={(event) => { handlerLastName(event.target.value) }}
                                    label="LastName:"
                                    labelPlacement="floating"
                                    placeholder="Galarza Medrano">
                                </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    value={_address}
                                    onIonInput={(event) => { handlerAddress(event.target.value) }}
                                    label="Address:"
                                    labelPlacement="floating"
                                    placeholder="Barrio Jovenal s/N">
                                </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    value={_username}
                                    onIonInput={(event) => { handlerUsername(event.target.value) }}
                                    label="Username:"
                                    labelPlacement="floating"
                                    placeholder="jhon.galarza@mail.com"
                                    type="email">
                                </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    value={_password}
                                    onIonInput={(event) => { handlerPassword(event.target.value) }}
                                    label="Password:"
                                    labelPlacement="floating"
                                    placeholder="Password">
                                </IonInput>
                            </IonItem>
                            <IonButton onClick={handlerClick}  expand="block">Register</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonLabel  onClick={handlerLogin} >Volver al login</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
}


export default RegisterPage;