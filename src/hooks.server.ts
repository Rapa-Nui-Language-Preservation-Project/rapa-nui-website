import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

const DEFAULT_PB_URL = 'http://127.0.0.1:8090';

export const handle = async ({ event, resolve }) => {
	// Resolve the PocketBase endpoint from environment for container deployments
	const pocketbaseUrl = env.POCKETBASE_URL ?? DEFAULT_PB_URL;

	if (!event.locals.pb) {
		event.locals.pb = new PocketBase(pocketbaseUrl);
	}

	return resolve(event);
};
