import { Injectable } from '@angular/core';
import fsData from '../../utils/fs-data-loader';
import { FileSystemHelper } from '../../utils/fs';
import { BehaviorSubject } from 'rxjs';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { CurrentContent } from '../../interfaces/current-content.interface';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {
  fs = new FileSystemHelper(fsData);
  currentContentSource = new BehaviorSubject<CurrentContent | null>(null);
  $currentContent = this.currentContentSource.asObservable(); 

  constructor() { }

  updateCurrentContentByPath(path: string){
    const nodes = this.fs.getChildrenNodes(path + '__folder__');
    this.currentContentSource.next({path, nodes});
  }

  updateCurrentContent(contentData: Partial<CurrentContent>){
    const currentValue = this.currentContentSource.getValue();
    if(currentValue) this.currentContentSource.next({...currentValue, ...contentData});
  }
}
