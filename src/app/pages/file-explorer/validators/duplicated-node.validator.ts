import { AbstractControl } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import * as md5 from 'md5';
import { isFile, isFolder, joinPathWithName } from '../utils/node';

export function ValidateFolderCreation(service: LocalStorageService) {
  return (control: AbstractControl) => {
    const name = control.value;
    const graph = service.graphSource.getValue()!;
    const currentContet = service.currentContentSource.getValue();
    if (name && graph && currentContet) {
      const folderPattern = /^(?! *$)[a-zA-Z0-9_ -]+$/;
      const nodeId = md5(
        joinPathWithName(graph[currentContet.parentId!].path, name) +
          '__folder__'
      );
      if (folderPattern.test(name) === false) {
        return { folderPattern: true };
      }
      if (graph[nodeId]) {
        return { duplicatedFolderName: true };
      }
    }
    return null;
  };
}

export function ValidateNodeRename(service: LocalStorageService) {
  return (control: AbstractControl) => {
    const name = control.value;
    const graph = service.graphSource.getValue()!;
    const currentContet = service.currentContentSource.getValue();
    const node = currentContet?.selectedNode;
    if (name && graph && currentContet && node) {
      const filePattern = /^[a-zA-Z0-9_\- .]+$/;
      const folderPattern = /^(?! *$)[a-zA-Z0-9_ -]+$/;
      if (node.type === '__file__' && filePattern.test(name) === false) {
        return { filePattern: true };
      }
      if (node.type === '__folder__' && folderPattern.test(name) === false) {
        return { folderPattern: true };
      }
      if (node.name === name) return null;
      if (isFolder(node)) {
        if (
          graph[
            md5(
              joinPathWithName(graph[currentContet.parentId!].path, name) +
                '__folder__'
            )
          ]
        ) {
          return { duplicatedFolderName: true };
        }
      } else if (isFile(node)) {
        if (
          graph[
            md5(
              joinPathWithName(graph[currentContet.parentId!].path, name) +
                '__file__'
            )
          ]
        ) {
          return { duplicatedFileName: true };
        }
      }
    }
    return null;
  };
}
