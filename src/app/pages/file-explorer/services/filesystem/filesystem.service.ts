import { Injectable } from '@angular/core';
import fsData from '../../utils/fs-data-loader';
import { FileSystemHelper } from '../../utils/fs';
import { BehaviorSubject } from 'rxjs';
import { CurrentContent } from '../../interfaces/current-content.interface';
import * as md5 from 'md5';
import { FolderNode } from '../../utils/node';

@Injectable({
  providedIn: 'root',
})
export class FilesystemService {
  fs = new FileSystemHelper(fsData);
  currentContentSource = new BehaviorSubject<CurrentContent>({});
  $currentContent = this.currentContentSource.asObservable();

  constructor() {}

  createFolder(name: string) {
    const currentContent = this.currentContentSource.getValue()!;
    if (currentContent.path) {
      const newFolder = new FolderNode({
        creatorName: '',
        name: name,
        size: 0,
        parentPath: currentContent.path,
        parentID: md5(currentContent.path + '__folder__'),
      });
      this.fs.addNode(newFolder);
    }
  }

  updateCurrentContent(contentData: Partial<CurrentContent>) {
    const currentValue = this.currentContentSource.getValue();
    if (currentValue)
      this.currentContentSource.next({ ...currentValue, ...contentData });
    else {
      this.currentContentSource.next({ ...contentData });
    }
  }
}
