import { Pipe, PipeTransform } from '@angular/core';
import { ContractType} from "../api/employee";

@Pipe({ name: 'contractTypeDisplay' })
export class ContractTypeDisplayPipe implements PipeTransform {
  transform(value: ContractType): string {
    switch (value) {
      case ContractType.FULL_TIME:
        return "Temps complet";
      case ContractType.PART_TIME:
        return "Temps partiel";
      case ContractType.TEMPORARY:
        return "Temporaire";
      case ContractType.PROBATION:
        return "Période d'essai";
      default:
        return value;
    }
  }
}
