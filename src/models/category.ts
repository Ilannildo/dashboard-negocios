import { ISubcategory } from "./subcategory";

export interface ICategory {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  subcategories: ISubcategory[];
}
