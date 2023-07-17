export interface createProfile {
    name: string;
    type: string;
    age: number;
    location: string;
    shortDescription: string;
    longDescription: string;
}

export interface adoptionApplication {
    profileId: number;
    name: string;
    address: string;
    contact: string;
}
