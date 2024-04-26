import { User } from "./user.model";

export interface Reservation {
    id: number;
    user: User;
    typeTable: String;
    dateTime: Date;
    commandeStatus: CommandeStatus;
  }
  
  export enum CommandeStatus {
    EN_ATTENTE = 'EN_ATTENTE',
    ACCEPTE = 'ACCEPTE',
    REFUSE = 'REFUSE'
  }
  