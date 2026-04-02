import type { PageServerLoad } from './$types';
import { Collections, type MediaResponse } from '$lib/pocketbase-types';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

function getPublicFileURL(
	record: { id: string; collectionId?: string; collectionName?: string },
	filename: string
): string {
	if (!filename) return '';
	const collection = record.collectionId || record.collectionName || '';
	const recordId = record.id || '';
	return `${PUBLIC_POCKETBASE_URL}/files/${collection}/${recordId}/${filename}`;
}

async function getMediaByTitle(locals: App.Locals, title: string): Promise<MediaResponse | null> {
	try {
		return await locals.pb.collection(Collections.Media).getFirstListItem(`title="${title}"`);
	} catch {
		return null;
	}
}

export const load: PageServerLoad = async ({ locals }) => {
	const [inaKoMouPdf, inaKoMouCover] = await Promise.all([
		getMediaByTitle(locals, 'Ina Ko Mou'),
		getMediaByTitle(locals, 'Ina Ko Mou Cover')
	]);

	return {
		inaKoMouPdfUrl: inaKoMouPdf?.file ? getPublicFileURL(inaKoMouPdf, inaKoMouPdf.file) : null,
		inaKoMouCoverUrl: inaKoMouCover?.file
			? getPublicFileURL(inaKoMouCover, inaKoMouCover.file)
			: null
	};
};
