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
    birthdate: employee.birthdate ? employee.birthdate.toISOString().split('.')[0] + '+00:00' : null,
    hire_date: employee.hireDate ? employee.hireDate.toISOString().split('.')[0] + '+00:00' : null,
    phone: employee.phone,
    address: employee.address,
    postal_code: employee.postalCode,
    social_security_number: employee.socialSecurityNumber,
    contract_type: employee.contractType,
    contract_end_date: employee.contractEndDate ? employee.contractEndDate.toISOString().split('.')[0] + '+00:00' : null,
    disability: employee.disability,
    disability_desc: employee.disabilityDesc,
    enabled: employee.enabled,
    created_at: employee.createdAt ? employee.createdAt.toISOString().split('.')[0] + '+00:00' : null,
    modified_at: employee.modifiedAt ? employee.modifiedAt.toISOString().split('.')[0] + '+00:00' : null,

    restaurant: employee.restaurant ? mapRestaurantToApiData(employee.restaurant) : null,
  };
}
