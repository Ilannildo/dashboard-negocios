import { ICompany } from "./company";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  id_company: number;
  type: number;
  status_payment_company: number;
  type_company: "industry" | "company" | "company_common";
  verify_register: string;
  step_register: string;
  email_verified_at: Date;
  accept_terms: string;
  date_accept?: any;
  created_at: Date;
  updated_at: Date;
}

export interface IAuthUser {
  //   type_company: "industry" | "company" | "company_common";
  invoices: any[];
  number_demands: number;
  number_applications_demands: number;
  number_applications_demands_admin?: number;
  is_education: boolean;
  accept_terms: boolean | number;
  status_diagnostic?: boolean | number;
  access_token: string;
  expires_in: number;
  status_payment: number;
  person?: string;
  user: IUser;
  company: ICompany;
}

export enum UserType {
  ADMIN = 0,
  BUYER = 1,
  SELLER = 2,
}
