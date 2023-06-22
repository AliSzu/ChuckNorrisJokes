import { CategoryEnum } from "../enums/CategoryEnum";

export interface ChuckJoke {
    categories: CategoryEnum[];
    createdAt: Date; 
    iconUrl: string;
    id: string;
    updatedAt: Date;
    url: string;
    value: string;
  }
  