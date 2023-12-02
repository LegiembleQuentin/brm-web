import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  static formatDateToDDMMYYYY(dateObject: Date | null) {
    if (dateObject == null){
      return null;
    }
    var day = String(dateObject.getDate()).padStart(2, '0');
    var month = String(dateObject.getMonth() + 1).padStart(2, '0');
    var year = dateObject.getFullYear();

    return day + '-' + month + '-' + year;
  }

  static formatDDMMYYYYToDate(dateString: string | null) {
    if (dateString == null || dateString == ''){
      return null;
    }
    var parts = dateString.split('-');

    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }
}
