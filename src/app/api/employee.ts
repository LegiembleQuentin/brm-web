import {mapRestaurantToApiData, Restaurant} from "./restaurant";

export enum ContractType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  TEMPORARY = "TEMPORARY",
  PROBATION = "PROBATION"
}
export enum EmployeeRole {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  DIRECTOR = "DIRECTOR",
}

export enum EmployeeSexe {
  M = "M",
  F = "F"
}

export interface Employee {
  id?: string;
  email?: string;
  role?: EmployeeRole;
  sexe?: EmployeeSexe;
  name?: string;
  firstname?: string;
  birthdate?: Date;
  hireDate?: Date;
  phone?: string;
  address?: string;
  postalCode?: string;
  socialSecurityNumber?: string;
  contractType?: ContractType;
  contractEndDate?: Date;
  disability?: boolean;
  disabilityDesc?: string;
  enabled?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
  restaurant?: Restaurant;
}

export function mapApiDataToEmployee(apiData: any): Employee {
  return {
    id: apiData.id,
    email: apiData.email,
    role: EmployeeRole[apiData.role as keyof typeof EmployeeRole],
    sexe: apiData.sexe,
    name: apiData.name,
    firstname: apiData.firstname,
    birthdate: apiData.birthdate ? new Date(apiData.birthdate) : undefined,
    hireDate: apiData.hire_date ? new Date(apiData.hire_date) : undefined,
    phone: apiData.phone,
    address: apiData.address,
    postalCode: apiData.postal_code,
    socialSecurityNumber: apiData.social_security_number,
    contractType: ContractType[apiData.contract_type as keyof typeof ContractType],
    contractEndDate: apiData.contract_end_date ? new Date(apiData.contract_end_date) : undefined,
    disability: apiData.disability,
    disabilityDesc: apiData.disability_desc,
    enabled: apiData.enabled,
    createdAt: apiData.created_at ? new Date(apiData.created_at) : undefined,
    modifiedAt: apiData.modified_at ? new Date(apiData.modified_at) : undefined,
    restaurant: apiData.restaurant,
  };
}

export function mapEmployeeToApiData(employee: Employee): any {
  return {
    id: employee.id,
    email: employee.email,
    role: employee.role,
    sexe: employee.sexe,
    name: employee.name,
    firstname: employee.firstname,
    birthdate: employee.birthdate ? employee.birthdate.toISOString() : null,
    hireDate: employee.hireDate ? employee.hireDate.toISOString() : null,
    phone: employee.phone,
    address: employee.address,
    postalCode: employee.postalCode,
    socialSecurityNumber: employee.socialSecurityNumber,
    contractType: employee.contractType,
    contractEndDate: employee.contractEndDate ? employee.contractEndDate.toISOString() : null,
    disability: employee.disability,
    disabilityDesc: employee.disabilityDesc,
    enabled: employee.enabled,
    createdAt: employee.createdAt ? employee.createdAt.toISOString() : null,
    modifiedAt: employee.modifiedAt ? employee.modifiedAt.toISOString() : null,

    restaurant: employee.restaurant ? mapRestaurantToApiData(employee.restaurant) : null,
  };
}
