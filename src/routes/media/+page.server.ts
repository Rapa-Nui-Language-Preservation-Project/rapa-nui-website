import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    let response = await fetch('http://0.0.0.0:8000/api/media');
    let json = await response.json();

    return {
        media: json
    }
};