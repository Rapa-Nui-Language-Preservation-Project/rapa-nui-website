import type { PageServerLoad } from './$types';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export interface LanguageBook {
	title: string;
	subtitle: string;
	cover: string;
	pdf: string;
}

function getPublicFileURL(
	record: { id: string; collectionId?: string; collectionName?: string },
	filename: string
): string {
	if (!filename) return '';
	const collection = record.collectionId || record.collectionName || '';
	return `${PUBLIC_POCKETBASE_URL}/files/${collection}/${record.id}/${filename}`;
}

export const load: PageServerLoad = async ({ locals }) => {
	const records = await locals.pb.collection('language_books').getFullList({
		sort: 'section,order'
	});

	const edicionVerdeBooks: LanguageBook[] = records
		.filter((r) => r.section === 'edicion_verde')
		.map((r) => ({
			title: r.title as string,
			subtitle: r.subtitle as string,
			cover: getPublicFileURL(r, r.cover as string),
			pdf: getPublicFileURL(r, r.pdf as string)
		}));

	const inaKoMouRecords = records.filter((r) => r.section === 'ina_ko_mou');
	const inaKoMouBook: LanguageBook | null =
		inaKoMouRecords.length > 0
			? {
					title: inaKoMouRecords[0].title as string,
					subtitle: inaKoMouRecords[0].subtitle as string,
					cover: getPublicFileURL(inaKoMouRecords[0], inaKoMouRecords[0].cover as string),
					pdf: getPublicFileURL(inaKoMouRecords[0], inaKoMouRecords[0].pdf as string)
				}
			: null;

	return {
		edicionVerdeBooks,
		inaKoMouBook
	};
};
