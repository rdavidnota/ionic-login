import { IonApp, setupIonicReact } from '@ionic/react';
import RouteApp from './routes/RouteApp';
import { Provider } from 'react-redux';
import store from './redux/store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { storage } from './storage/storage';

setupIonicReact();

const App: React.FC = () => {
  storage.create();

  return (
    <Provider store={store}>
      <IonApp>
        <RouteApp></RouteApp>
      </IonApp>
    </Provider>
  );
};

export default App;
