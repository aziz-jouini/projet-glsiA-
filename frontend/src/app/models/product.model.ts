// product.model.ts

import { Menu } from "./menu.model";

export interface Product {
    id?: number;
    name: string;
    price: number;
    description: string;
    menu?: Menu; // Assurez-vous que Menu est importé depuis son fichier modèle
  }
  