import {Employee} from "./employee";

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
