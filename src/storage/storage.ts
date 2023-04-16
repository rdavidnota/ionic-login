import { Storage } from '@ionic/storage';
import { INDEXEDDB, LOCALSTORAGE, } from 'localforage'
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export const storage = new Storage({
    driverOrder: [cordovaSQLiteDriver._driver, INDEXEDDB, LOCALSTORAGE]
});

export async function getData(key: string): Promise<any> {
    let response = await storage.get(key)
    return response;
}

