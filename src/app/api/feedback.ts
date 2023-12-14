import {Employee, EmployeeRole, mapApiDataToEmployee, mapEmployeeToApiData} from "./employee";
import {DateService} from "../service/date/date.service";

export interface Feedback {
  id?: string;
  warning?:boolean;
  content?:string;
  createdAt?:Date;
  employee?: Employee;
  author?:Employee;
}

export function mapApiDataToFeedback(apiData: any): Feedback{
  return {
    id: apiData.id,
    warning: apiData.warning,
    content: apiData.content,
    createdAt: apiData.created_at ? new Date(apiData.created_at) : undefined,
    employee: apiData.employee ? mapApiDataToEmployee(apiData.employee) : undefined,
    author: mapApiDataToEmployee(apiData.author),
  }
}

export function mapApiDataToFeedBackForEmployee(apiData: any): Feedback{
  return {
    id: apiData.id,
    warning: apiData.warning,
    content: apiData.content,
    createdAt: apiData.created_at ? new Date(apiData.created_at) : undefined,
    author: {
      id: apiData.author.id,
      email: apiData.author.email,
      name: apiData.author.name,
      firstname: apiData.author.firstname,
    }
  }
}

export function mapFeedbackToApiData(feedback: Feedback): any {
  return {
    id: feedback.id,
    warning: feedback.warning,
    content: feedback.content,
    created_at: DateService.formatDateToApiFormat(feedback.createdAt),

    employee: feedback.employee ? mapEmployeeToApiData(feedback.employee) : null,
    author: feedback.author ? mapEmployeeToApiData(feedback.author) : null,
  };
}
