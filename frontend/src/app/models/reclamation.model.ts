// reclamation.model.ts
export interface Reclamation {
    id: number;
    userId: number; // Utilisez l'identifiant de l'utilisateur au lieu de l'objet complet de l'utilisateur
    description: string;
}
