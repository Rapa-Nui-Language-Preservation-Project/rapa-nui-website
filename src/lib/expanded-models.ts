import type {
	AuthorsResponse,
	LayersResponse,
	LocationsResponse,
	MediaResponse,
	StoriesResponse,
	ActividadResponse,
	PruebasResponse,
	AgroecologyResponse,
	AgroecologyImagesResponse,
	AgroecologyTaxonomyRowsResponse
} from '$lib/pocketbase-types';

// Custom type for agroecology images with transformed file URL
export type ExpandedAgroecologyImage = AgroecologyImagesResponse & {
	file?: string; // Transformed URL from image field
};

type AgroecologyExpand = {
	images: ExpandedAgroecologyImage[];
	taxonomy_rows: AgroecologyTaxonomyRowsResponse[];
};

type AuthorExpand = {
	stories: StoriesResponse[];
};

export type ExpandedAuthor = AuthorsResponse<AuthorExpand>;

type LocationExpand = {
	media: MediaResponse[];
	story: StoriesResponse[];
	author?: AuthorsResponse<AuthorExpand>;
	actividad: ActividadResponse<unknown, ActividadExpand>[];
	agroecology?: AgroecologyResponse<AgroecologyExpand>;
};

type LayerExpand = {
	locations: LocationsResponse<LocationExpand>[];
};

type ActividadExpand = {
	media: MediaResponse[];
	pruebas: PruebasResponse[];
};

export type ExpandedLayer = LayersResponse<LayerExpand>;
export type ExpandedLocation = LocationsResponse<LocationExpand>;
