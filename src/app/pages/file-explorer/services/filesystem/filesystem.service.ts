import { Injectable } from '@angular/core';
import fsData from '../../utils/fs-data-loader';
import { FileSystemHelper } from '../../utils/fs';
import { BehaviorSubject } from 'rxjs';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {
  fs = new FileSystemHelper(fsData);
  private currentContentSource = new BehaviorSubject<Array<IFileNode | IFolderNode> | null>(null);
  $currentContent = this.currentContentSource.asObservable(); 

  constructor() { }

  updateCurrentContent(path: string){
    this.currentContentSource.next(this.fs.getChildrenNodes(path + '__folder__'));
  }
}
