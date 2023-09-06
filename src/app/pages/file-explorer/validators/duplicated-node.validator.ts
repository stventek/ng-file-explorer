import { AbstractControl } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import * as md5 from 'md5';
import { IFileNode, IFolderNode } from '../interfaces/node.interface';
import { isFile, isFolder } from '../utils/node';

export function ValidateFolderDuplication(service: LocalStorageService) {
  return (control: AbstractControl) => {
    const graph = service.graphSource.getValue()!;
    const currentContet = service.currentContentSource.getValue();
    const name = control.value;
    if (
      name &&
      graph &&
      currentContet &&
      graph[md5(`${currentContet.path!}/${name}__folder__`)]
    )
      return { duplicatedFolderName: true };
    return null;
  };
}

export function ValidateNodeDuplication(service: LocalStorageService) {
  return (control: AbstractControl) => {
    const name = control.value;
    const graph = service.graphSource.getValue()!;
    const currentContet = service.currentContentSource.getValue();
    const node = currentContet?.selectedNode;
    if (name && graph && currentContet && node) {
      if (node.name === name) return null;
      if (isFolder(node)) {
        if (graph[md5(`${currentContet.path!}/${name}__folder__`)]) {
          return { duplicatedNodeName: true };
        }
      } else if (isFile(node)) {
        if (graph[md5(`${currentContet.path!}/${name}__file__`)]) {
          return { duplicatedNodeName: true };
        }
      }
    }
    return null;
  };
}
