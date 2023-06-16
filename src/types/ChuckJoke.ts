import { CategoryEnum } from "../enums/CategoryEnum";

export interface ChuckJoke {
    categories: CategoryEnum[];
    cretedAt: Date; 
    iconUrl: string;
    id: string;
    updatedAt: Date;
    url: string;
    value: string;
  }
  