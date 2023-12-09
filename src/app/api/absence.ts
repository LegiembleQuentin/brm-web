import {Employee, mapApiDataToEmployee, mapEmployeeToApiData} from "./employee";
import {DateService} from "../service/date/date.service";

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

export function mapAbsenceToApiData(absence: Absence): any {
  return {
    id: absence.id,
    approved: absence.approved,
    type: absence.type,
    reason: absence.reason,
    start_date: DateService.formatDateToApiFormat(absence.startDate),
    end_date: DateService.formatDateToApiFormat(absence.endDate),
    created_at: DateService.formatDateToApiFormat(absence.createdAt),

    employee: absence.employee ? mapEmployeeToApiData(absence.employee) : null,
  };
}
