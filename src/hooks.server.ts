import PocketBase from 'pocketbase';

export const handle = async ({ event, resolve }) => {
    const URL = 'http://0.0.0.0:8090';
    if (!event.locals.pb) {
        event.locals.pb = new PocketBase(URL);
    }
    return resolve(event);
}