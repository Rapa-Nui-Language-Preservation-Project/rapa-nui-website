import type { LayersResponse, LocationsResponse, MediaResponse, StoriesResponse } from '$lib/pocketbase-types';

type LocationExpand = {
    media: MediaResponse[];
    story: StoriesResponse[];
}

type LayerExpand = {
    locations: LocationsResponse<LocationExpand>[];
}

export type ExpandedLayer = LayersResponse<LayerExpand>;
export type ExpandedLocation = LocationsResponse<LocationExpand>;