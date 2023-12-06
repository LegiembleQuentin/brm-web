import {Employee, mapApiDataToEmployee} from "./employee";

export interface Absence {
  id?: string;
  approved?: boolean;
  type?:string;
  reason?:string;
  startDate?:Date;
  endDate?:Date;
  createdAt?:Date;
  employee?: Employee;
}

export function mapApiDataToAbsence(apiData: any): Absence {
  return {
    id: apiData.id,
    approved: apiData.approved,
    type: apiData.type,
    reason: apiData.reason,
    startDate: apiData.start_date ? new Date(apiData.start_date) : undefined,
    endDate: apiData.end_date ? new Date(apiData.end_date) : undefined,
    createdAt: apiData.created_at ? new Date(apiData.created_at) : undefined,
    employee: apiData.employee ? mapApiDataToEmployee(apiData.employee) : undefined,
  }
}
