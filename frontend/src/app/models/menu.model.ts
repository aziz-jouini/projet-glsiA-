import { Image } from "./image.model";

export interface Menu {
    id?: number;
    name: string;
    description: string;
    imageId: number; // L'ID de l'image associée au menu
}
