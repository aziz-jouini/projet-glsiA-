import { User } from "./user.model";

export interface Reclamation {
    id: number;
    user: User;
    description: String;
}