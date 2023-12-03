import {Employee, mapEmployeeToApiData} from "./employee";

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
    createdAt: apiData.created_at,
    employee: apiData.employee,
    author: apiData.author,
  }
}

export function mapFeedbackToApiData(feedback: Feedback): any {
  return {
    id: feedback.id,
    warning: feedback.warning,
    content: feedback.content,
    created_at: feedback.createdAt ? feedback.createdAt.toISOString().split('.')[0] + '+00:00' : null,

    employee: feedback.employee ? mapEmployeeToApiData(feedback.employee) : null,
    author: feedback.author ? mapEmployeeToApiData(feedback.author) : null,
  };
}
