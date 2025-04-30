import type { PageServerLoad } from './$types';
import { Collections } from '$lib/pocketbase-types';
import type { ExpandedLayer } from '$lib/expanded-models';

export const load: PageServerLoad = async ({ locals }) => {
	// Get the layers from PocketBase and expand the locations and media fields
	const layers: ExpandedLayer[] = await locals.pb
		.collection(Collections.Layers)
		.getFullList({ expand: 'locations,locations.media,locations.story' });

	// Add the URL to the media files
	for (const layer of layers) {
		for (const location of layer.expand.locations || []) {
			for (const media of location.expand.media || []) {
				media.file = locals.pb.files.getURL(media, media.file);
			}
			for (const story of location.expand.story || []) {
				story.field = locals.pb.files.getURL(story, story.field);
			}
		}
	}

	return {
		layers
	};
};
