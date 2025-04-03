export type Location = {
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;

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

export type Media = {
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;

    id: string;
    title: string;
    description: string;
    type: string;
    file: string;
    license: string;
}