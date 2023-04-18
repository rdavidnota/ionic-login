import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/menu/Menu';
import HomePage from '../pages/home/Home';
import LoginPage from '../pages/login/Login';
import Page from '../pages/Page';
import RegisterPage from '../pages/register/register';


const RouteApp: React.FC = () => {

    return (
        <IonReactRouter>
            <IonSplitPane contentId="main" >
                <Menu />
                <IonRouterOutlet id="main" >
                    <Route path="/" exact={true} >
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/folder/:name" exact={true} >
                        <Page />
                    </Route>
                    <Route path="/login" exact={true} >
                        <LoginPage />
                    </Route>
                    <Route path="/home" exact={true} >
                        <HomePage />
                    </Route>
                    <Route path="/register" exact={true} >
                        <RegisterPage />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonReactRouter>
    );
};

export default RouteApp;
