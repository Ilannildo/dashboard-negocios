export interface ICompany {
  id: number;
  first_login?: number;
  company_name: string;
  email: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
