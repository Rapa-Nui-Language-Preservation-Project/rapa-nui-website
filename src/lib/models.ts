type PocketBaseRecord = {
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
}

export interface Layer extends PocketBaseRecord {
    id: string;
    name: string;
    description: string;
    
    expand: {
        locations: Location[];
    }
}

export interface Location extends PocketBaseRecord {
    id: string;
    name: string;
    description: string;
    type: string;
    latitude: number;
    longitude: number;

    expand: {
        media: Media[];
    };
}

export interface Media extends PocketBaseRecord {
    id: string;
    title: string;
    description: string;
    type: string;
    file: string;
    license: string;
}