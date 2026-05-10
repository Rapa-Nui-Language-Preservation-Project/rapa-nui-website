/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export const Collections = {
	Authorigins: "_authOrigins",
	Externalauths: "_externalAuths",
	Mfas: "_mfas",
	Otps: "_otps",
	Superusers: "_superusers",
	Actividad: "actividad",
	Agroecology: "agroecology",
	AgroecologyImages: "agroecology_images",
	AgroecologyTaxonomyRows: "agroecology_taxonomy_rows",
	Authors: "authors",
	LanguageBooks: "language_books",
	Layers: "layers",
	Locations: "locations",
	Media: "media",
	Pruebas: "pruebas",
	Stories: "stories",
	Users: "users",
} as const
export type Collections = typeof Collections[keyof typeof Collections]

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type ActividadRecord<Tpruebas = unknown> = {
	created: IsoAutoDateString
	description_espanol?: string
	description_rapa_nui?: string
	id: string
	mapa?: FileNameString
	media?: RecordIdString[]
	participantes?: string
	pruebas?: null | Tpruebas
	title?: string
	updated: IsoAutoDateString
}

export const AgroecologyPlantOriginOptions = {
	"nativa": "nativa",
	"introducida": "introducida",
} as const
export type AgroecologyPlantOriginOptions = typeof AgroecologyPlantOriginOptions[keyof typeof AgroecologyPlantOriginOptions]
export type AgroecologyRecord = {
	citations?: string
	created: IsoAutoDateString
	description?: string
	id: string
	images?: RecordIdString[]
	isMedicinal?: boolean
	plantName?: string
	plantOrigin?: AgroecologyPlantOriginOptions
	rapa_nui_description?: string
	scientificName?: string
	spanishName?: string
	taxonomyTitle?: string
	taxonomy_rows?: RecordIdString[]
	updated: IsoAutoDateString
}

export type AgroecologyImagesRecord = {
	created: IsoAutoDateString
	id: string
	image?: FileNameString
	order?: number
	page?: RecordIdString
	taxonomy?: RecordIdString
	title?: string
	updated: IsoAutoDateString
}

export type AgroecologyTaxonomyRowsRecord = {
	created: IsoAutoDateString
	especie?: string
	familia?: string
	genero?: string
	id: string
	nombreComun?: string
	orden?: string
	order?: number
	page?: RecordIdString
	tipo?: string
	updated: IsoAutoDateString
}

export type AuthorsRecord = {
	bio_en?: string
	bio_rn?: string
	created: IsoAutoDateString
	dedication_en?: string
	dedication_rn?: string
	id: string
	name?: string
	stories?: RecordIdString[]
	updated: IsoAutoDateString
}

export const LanguageBooksSectionOptions = {
	"edicion_verde": "edicion_verde",
	"ina_ko_mou": "ina_ko_mou",
} as const
export type LanguageBooksSectionOptions = typeof LanguageBooksSectionOptions[keyof typeof LanguageBooksSectionOptions]
export type LanguageBooksRecord = {
	cover?: FileNameString
	created: IsoAutoDateString
	id: string
	order?: number
	pdf?: FileNameString
	section?: LanguageBooksSectionOptions
	subtitle?: string
	title?: string
	updated: IsoAutoDateString
}

export type LayersRecord = {
	cover_photo?: FileNameString[]
	created: IsoAutoDateString
	description?: string
	id: string
	isRight?: boolean
	locations?: RecordIdString[]
	name?: string
	updated: IsoAutoDateString
}

export const LocationsLanguageOptions = {
	"inglés": "inglés",
	"español": "español",
	"rapanui": "rapanui",
} as const
export type LocationsLanguageOptions = typeof LocationsLanguageOptions[keyof typeof LocationsLanguageOptions]

export const LocationsTypeOptions = {
	"site": "site",
} as const
export type LocationsTypeOptions = typeof LocationsTypeOptions[keyof typeof LocationsTypeOptions]
export type LocationsRecord = {
	actividad?: RecordIdString[]
	agroecology?: RecordIdString
	author?: RecordIdString
	created: IsoAutoDateString
	description_espanol?: string
	description_rapa_nui?: string
	id: string
	language?: LocationsLanguageOptions[]
	latitude?: number
	longitude?: number
	media?: RecordIdString[]
	name?: string
	story?: RecordIdString[]
	type?: LocationsTypeOptions
	updated: IsoAutoDateString
}

export const MediaTypeOptions = {
	"image": "image",
	"video": "video",
	"text": "text",
	"pdf": "pdf",
} as const
export type MediaTypeOptions = typeof MediaTypeOptions[keyof typeof MediaTypeOptions]
export type MediaRecord = {
	created: IsoAutoDateString
	description?: string
	file?: FileNameString
	id: string
	license?: string
	title?: string
	type?: MediaTypeOptions
	updated: IsoAutoDateString
}

export type PruebasRecord = {
	created: IsoAutoDateString
	description_espanol?: string
	id: string
	title?: string
	updated: IsoAutoDateString
}

export type StoriesRecord = {
	author?: string
	created: IsoAutoDateString
	field?: FileNameString
	id: string
	image_title?: string
	text_rapanui?: string
	text_spanish?: string
	title?: string
	title_spanish?: string
	updated: IsoAutoDateString
}

export type UsersRecord = {
	avatar?: FileNameString
	created: IsoAutoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	username: string
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ActividadResponse<Tpruebas = unknown, Texpand = unknown> = Required<ActividadRecord<Tpruebas>> & BaseSystemFields<Texpand>
export type AgroecologyResponse<Texpand = unknown> = Required<AgroecologyRecord> & BaseSystemFields<Texpand>
export type AgroecologyImagesResponse<Texpand = unknown> = Required<AgroecologyImagesRecord> & BaseSystemFields<Texpand>
export type AgroecologyTaxonomyRowsResponse<Texpand = unknown> = Required<AgroecologyTaxonomyRowsRecord> & BaseSystemFields<Texpand>
export type AuthorsResponse<Texpand = unknown> = Required<AuthorsRecord> & BaseSystemFields<Texpand>
export type LanguageBooksResponse<Texpand = unknown> = Required<LanguageBooksRecord> & BaseSystemFields<Texpand>
export type LayersResponse<Texpand = unknown> = Required<LayersRecord> & BaseSystemFields<Texpand>
export type LocationsResponse<Texpand = unknown> = Required<LocationsRecord> & BaseSystemFields<Texpand>
export type MediaResponse<Texpand = unknown> = Required<MediaRecord> & BaseSystemFields<Texpand>
export type PruebasResponse<Texpand = unknown> = Required<PruebasRecord> & BaseSystemFields<Texpand>
export type StoriesResponse<Texpand = unknown> = Required<StoriesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	actividad: ActividadRecord
	agroecology: AgroecologyRecord
	agroecology_images: AgroecologyImagesRecord
	agroecology_taxonomy_rows: AgroecologyTaxonomyRowsRecord
	authors: AuthorsRecord
	language_books: LanguageBooksRecord
	layers: LayersRecord
	locations: LocationsRecord
	media: MediaRecord
	pruebas: PruebasRecord
	stories: StoriesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	actividad: ActividadResponse
	agroecology: AgroecologyResponse
	agroecology_images: AgroecologyImagesResponse
	agroecology_taxonomy_rows: AgroecologyTaxonomyRowsResponse
	authors: AuthorsResponse
	language_books: LanguageBooksResponse
	layers: LayersResponse
	locations: LocationsResponse
	media: MediaResponse
	pruebas: PruebasResponse
	stories: StoriesResponse
	users: UsersResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
