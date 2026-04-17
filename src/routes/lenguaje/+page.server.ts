import type { PageServerLoad } from './$types';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export interface LanguageBook {
	title: string;
	subtitle: string;
	cover: string;
	pdf: string;
}

type LanguageBookRecord = {
	id: string;
	collectionId?: string;
	collectionName?: string;
	section?: string;
	title?: string;
	subtitle?: string;
	cover?: string;
	pdf?: string;
};

function getPublicFileURL(
	record: { id: string; collectionId?: string; collectionName?: string },
	filename: string
): string {
	if (!filename) return '';
	const collection = record.collectionId || record.collectionName || '';
	return `${PUBLIC_POCKETBASE_URL}/files/${collection}/${record.id}/${filename}`;
}

function toLanguageBook(record: LanguageBookRecord): LanguageBook {
	return {
		title: record.title ?? '',
		subtitle: record.subtitle ?? '',
		cover: getPublicFileURL(record, record.cover ?? ''),
		pdf: getPublicFileURL(record, record.pdf ?? '')
	};
}

export const load: PageServerLoad = async ({ locals }) => {
	const records = (await locals.pb.collection('language_books').getFullList({
		sort: 'section,order'
	})) as LanguageBookRecord[];

	const edicionVerdeBooks: LanguageBook[] = records
		.filter((r) => r.section === 'edicion_verde')
		.map(toLanguageBook);

	const inaKoMouRecords = records.filter((r) => r.section === 'ina_ko_mou');
	const inaKoMouBook: LanguageBook | null =
		inaKoMouRecords.length > 0 ? toLanguageBook(inaKoMouRecords[0]) : null;

	return {
		edicionVerdeBooks,
		inaKoMouBook
	};
};
