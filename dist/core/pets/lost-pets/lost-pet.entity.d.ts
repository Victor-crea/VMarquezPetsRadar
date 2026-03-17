export declare class LostPet {
    id: number;
    name: string;
    species: string;
    breed: string;
    color: string;
    size: string;
    description: string;
    photoUrl: string | null;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    address: string;
    lostDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
