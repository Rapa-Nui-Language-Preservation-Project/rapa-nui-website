import PocketBase from 'pocketbase';

export const handle = async ({ event, resolve }) => {
    // Check if PoketBase is already initialized
    // If not, initialize it with the URL
    const PB_URL = 'http://127.0.0.1:8090';
    if (!event.locals.pb) {
        event.locals.pb = new PocketBase(PB_URL);
    }

    return resolve(event);
}