import type { PageServerLoad } from './$types';
import { Collections } from '$lib/pocketbase-types';
import type { ExpandedLayer } from '$lib/expanded-models';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

/**
 * Helper function to generate file URLs using the public PocketBase URL.
 * This ensures client-side browsers can access files even when the server
 * uses an internal Docker network URL.
 */
function getPublicFileURL(record: { id: string; collectionId?: string; collectionName?: string }, filename: string): string {
	if (!filename) return '';
	const collection = record.collectionId || record.collectionName || '';
	const recordId = record.id || '';
	return `${PUBLIC_POCKETBASE_URL}/files/${collection}/${recordId}/${filename}`;
}

export const load: PageServerLoad = async ({ locals }) => {
	// Fetch all collections in parallel for efficiency
	const [layers, pruebas] = await Promise.all([
		locals.pb.collection(Collections.Layers).getFullList({
			expand:
				'locations,locations.media,locations.story,locations.actividad,locations.actividad.pruebas,locations.actividad.media'
		}) as Promise<ExpandedLayer[]>,
		locals.pb.collection(Collections.Pruebas).getFullList()
	]);

	// This loop is necessary to resolve the file URLs for all your media.
	// We use getPublicFileURL to ensure URLs work for client-side browsers.
	for (const layer of layers) {
		if (layer.expand.locations) {
			for (const location of layer.expand.locations) {
				// Handle media directly on the location
				if (location.expand.media) {
					for (const media of location.expand.media) {
						media.file = getPublicFileURL(media, media.file);
					}
				}

				// Handle images within stories
				if (location.expand.story) {
					for (const story of location.expand.story) {
						story.field = getPublicFileURL(story, story.field);
					}
				}

				// Handle media within eachividad
				if (location.expand.actividad) {
					for (const actividad of location.expand.actividad) {
						if (actividad.mapa) {
							actividad.mapa = getPublicFileURL(actividad, actividad.mapa);
						}
						if (actividad.expand && actividad.expand.media) {
							for (const mediaItem of actividad.expand.media) {
								mediaItem.file = getPublicFileURL(mediaItem, mediaItem.file);
							}
						}
					}
				}
			}
		}
	}

	return {
		layers,
		pruebas
	};
};
