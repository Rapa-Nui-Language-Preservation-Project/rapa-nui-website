import type { PageServerLoad } from './$types';
import type { Location } from '$lib/models';

export const load: PageServerLoad = async ({ locals }) => {
	const locations: Location[] = await locals.pb
		.collection('locations')
		.getFullList({ expand: 'media' });


	// Add the URL to the media files
	locations.forEach((location) => {
		location.expand.media.forEach((media) => {
			media.file = locals.pb.files.getURL(media, media.file);
		});
	});

	return {
		locations
	};
};
