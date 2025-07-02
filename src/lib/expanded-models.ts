import type {
	LayersResponse,
	LocationsResponse,
	MediaResponse,
	StoriesResponse,
	ActividadResponse,
	PruebasResponse
} from '$lib/pocketbase-types';

type LocationExpand = {
	media: MediaResponse[];
	story: StoriesResponse[];
	actividad: ActividadResponse<unknown, ActividadExpand>[];
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
