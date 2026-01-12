export interface Review {
    _id?: string;            // jedinstveni ID recenzije
    user: string;            // id korisnika
    movieAPI: number;        // ID filma iz API-ja
    movieTitle: string;      // naziv filma
    rating: number;          // ocena 0-10
    review?: string;         // opcioni tekst recenzije
    createdAt?: Date;        // timestamps automatski dodaju
    updatedAt?: Date;        // timestamps automatski dodaju
}

