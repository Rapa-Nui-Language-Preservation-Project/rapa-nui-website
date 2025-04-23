import type { PageServerLoad } from './$types';
import type { Layer } from '$lib/models';

export const load: PageServerLoad = async ({ locals }) => {
	// Get the layers from PocketBase and expand the locations and media fields
	const layers: Layer[] = await locals.pb
		.collection('layers')
		.getFullList({ expand: 'locations,locations.media'});


	// Add the URL to the media files
	layers.forEach((layer) => {
		layer.expand.locations.forEach((location) => {
			location.expand.media.forEach((media) => {
				media.file = locals.pb.files.getURL(media, media.file);
			}
			);}
		);}
	);

	return {
		layers
	};
};
