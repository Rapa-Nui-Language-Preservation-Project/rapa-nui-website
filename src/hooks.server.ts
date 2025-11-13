import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

const DEFAULT_PB_URL = 'https://rapa-nui-prototipo.org/api';

export const handle = async ({ event, resolve }) => {
	// Resolve the PocketBase endpoint from environment for container deployments
	const pocketbaseUrl = env.POCKETBASE_URL ?? DEFAULT_PB_URL;

	if (!event.locals.pb) {
		event.locals.pb = new PocketBase(pocketbaseUrl);
	}

	return resolve(event);
};
