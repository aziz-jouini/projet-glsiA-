export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  role?: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
