import { AbstractControl } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import * as md5 from 'md5';

export function ValidateFolderDuplication(service: LocalStorageService) {
  return (control: AbstractControl) => {
    const graph = service.graphSource.getValue()!;
    const currentContet = service.currentContentSource.getValue();
    const name = control.value;
    if (
      name &&
      graph &&
      currentContet &&
      graph[md5(`${currentContet.path!}${name}__folder__`)]
    )
      return { duplicatedFolderName: true };
    return null;
  };
}
