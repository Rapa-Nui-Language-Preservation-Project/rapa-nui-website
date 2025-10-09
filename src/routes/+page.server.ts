import type { PageServerLoad } from './$types';
import { Collections } from '$lib/pocketbase-types';
import type { ExpandedLayer } from '$lib/expanded-models';

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
	for (const layer of layers) {
		if (layer.expand.locations) {
			for (const location of layer.expand.locations) {
				// Handle media directly on the location
				if (location.expand.media) {
					for (const media of location.expand.media) {
						media.file = locals.pb.files.getURL(media, media.file);
					}
				}

				// Handle images within stories
				if (location.expand.story) {
					for (const story of location.expand.story) {
						story.field = locals.pb.files.getURL(story, story.field);
					}
				}

				// Handle media within eachividad
				if (location.expand.actividad) {
					for (const actividad of location.expand.actividad) {
						if (actividad.mapa) {
							actividad.mapa = locals.pb.files.getURL(actividad, actividad.mapa);
						}
						if (actividad.expand && actividad.expand.media) {
							for (const mediaItem of actividad.expand.media) {
								mediaItem.file = locals.pb.files.getURL(mediaItem, mediaItem.file);
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
