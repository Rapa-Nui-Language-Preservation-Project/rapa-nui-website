/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Authorigins = '_authOrigins',
	Externalauths = '_externalAuths',
	Mfas = '_mfas',
	Otps = '_otps',
	Superusers = '_superusers',
	Layers = 'layers',
	Locations = 'locations',
	Media = 'media',
	Stories = 'stories',
	Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString;
	collectionId: string;
	collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	fingerprint: string;
	id: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type ExternalauthsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	provider: string;
	providerId: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type MfasRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	method: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type OtpsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	password: string;
	recordRef: string;
	sentTo?: string;
	updated?: IsoDateString;
};

export type SuperusersRecord = {
	created?: IsoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	verified?: boolean;
};

export type LayersRecord = {
	cover_photo?: string[];
	created?: IsoDateString;
	description?: string;
	id: string;
	locations?: RecordIdString[];
	name?: string;
	updated?: IsoDateString;
};

export enum LocationsLanguageOptions {
	'English' = 'English',
	'Spanish' = 'Spanish',
	'Rapa Nui' = 'Rapa Nui'
}

export enum LocationsTypeOptions {
	'site' = 'site'
}
export type LocationsRecord = {
	created?: IsoDateString;
	description?: string;
	id: string;
	language?: LocationsLanguageOptions[];
	latitude?: number;
	longitude?: number;
	media?: RecordIdString[];
	name?: string;
	story?: RecordIdString[];
	type?: LocationsTypeOptions;
	updated?: IsoDateString;
};

export enum MediaTypeOptions {
	'image' = 'image',
	'video' = 'video',
	'text' = 'text'
}
export type MediaRecord = {
	created?: IsoDateString;
	description?: string;
	file?: string;
	id: string;
	license?: string;
	title?: string;
	type?: MediaTypeOptions;
	updated?: IsoDateString;
};

export type StoriesRecord = {
	author?: string;
	created?: IsoDateString;
	field?: string;
	id: string;
	image_title?: string;
	text_rapanui?: string;
	text_spanish?: string;
	title?: string;
	title_spanish?: string;
	updated?: IsoDateString;
};

export type UsersRecord = {
	avatar?: string;
	created?: IsoDateString;
	email?: string;
	emailVisibility?: boolean;
	id: string;
	name?: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	username: string;
	verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> &
	BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> &
	BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
	AuthSystemFields<Texpand>;
export type LayersResponse<Texpand = unknown> = Required<LayersRecord> & BaseSystemFields<Texpand>;
export type LocationsResponse<Texpand = unknown> = Required<LocationsRecord> &
	BaseSystemFields<Texpand>;
export type MediaResponse<Texpand = unknown> = Required<MediaRecord> & BaseSystemFields<Texpand>;
export type StoriesResponse<Texpand = unknown> = Required<StoriesRecord> &
	BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord;
	_externalAuths: ExternalauthsRecord;
	_mfas: MfasRecord;
	_otps: OtpsRecord;
	_superusers: SuperusersRecord;
	layers: LayersRecord;
	locations: LocationsRecord;
	media: MediaRecord;
	stories: StoriesRecord;
	users: UsersRecord;
};

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse;
	_externalAuths: ExternalauthsResponse;
	_mfas: MfasResponse;
	_otps: OtpsResponse;
	_superusers: SuperusersResponse;
	layers: LayersResponse;
	locations: LocationsResponse;
	media: MediaResponse;
	stories: StoriesResponse;
	users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>;
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>;
	collection(idOrName: '_mfas'): RecordService<MfasResponse>;
	collection(idOrName: '_otps'): RecordService<OtpsResponse>;
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>;
	collection(idOrName: 'layers'): RecordService<LayersResponse>;
	collection(idOrName: 'locations'): RecordService<LocationsResponse>;
	collection(idOrName: 'media'): RecordService<MediaResponse>;
	collection(idOrName: 'stories'): RecordService<StoriesResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
};
