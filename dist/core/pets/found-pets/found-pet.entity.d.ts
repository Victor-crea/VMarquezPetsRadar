export declare class FoundPet {
    id: number;
    species: string;
    breed: string | null;
    color: string;
    size: string;
    description: string;
    photoUrl: string | null;
    finderName: string;
    finderEmail: string;
    finderPhone: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    address: string;
    foundDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
