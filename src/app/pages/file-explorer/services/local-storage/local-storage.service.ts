import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { LocalStorageETL } from '../../utils/localstorage-ETL';
import * as md5 from 'md5';
import { FolderNode } from '../../utils/node';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { FileSystemHelperV2 } from '../../utils/fs';
import { FSData } from '../../interfaces/fs-data.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  fsHelper = new FileSystemHelperV2();
  currentContentSource = new BehaviorSubject<CurrentContent>({});
  $currentContent = this.currentContentSource.asObservable();
  graphSource = new BehaviorSubject<FSData | null>(null);
  $graph = this.graphSource.asObservable();
  localStorageETL = new LocalStorageETL();
  sortType: 'name' | 'size' = 'name';
  ascending = true;
  constructor() {}

  refreshGraph() {
    const graph = this.localStorageETL.load();
    this.fsHelper.updateGraph(graph);
    this.graphSource.next(graph);
  }

  updateCurrentContent(contentData: Partial<CurrentContent>) {
    const currentValue = this.currentContentSource.getValue();
    if (currentValue)
      this.currentContentSource.next({ ...currentValue, ...contentData });
    else {
      this.currentContentSource.next({ ...contentData });
    }
  }

  sortChildsBy(path: string, type?: 'name' | 'size', ascending?: boolean) {
    if (type) this.sortType = type;
    if (ascending !== undefined) this.ascending = ascending;
    this.fsHelper.sortChildsBy(path, this.sortType, this.ascending);
    this.graphSource.next(this.fsHelper.getAdjGraph());
  }

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
      this.fsHelper.addNode(newFolder);
      this.fsHelper.sortChildsBy(
        currentContent.path,
        this.sortType,
        this.ascending
      );
      this.graphSource.next(this.fsHelper.getAdjGraph());
      this.updateCurrentContent({ selectedNode: newFolder });
    }
  }

  deleteNode(node: IFileNode | IFolderNode) {
    this.fsHelper.deleteNode(node);
    this.fsHelper.sortChildsBy(node.parentPath!, this.sortType, this.ascending);
    this.graphSource.next(this.fsHelper.getAdjGraph());
  }

  updateNodeByInstance(
    node: IFileNode | IFolderNode,
    data: Partial<IFileNode> | Partial<IFolderNode>
  ) {
    node = this.fsHelper.updateNodeByInstance(node, data);
    this.fsHelper.sortChildsBy(node.parentPath!, this.sortType, this.ascending);
    this.graphSource.next(this.fsHelper.getAdjGraph());
    this.updateCurrentContent({ selectedNode: node });
  }

  searchBFSIds(keyword: string, rootPath: string) {
    const result = this.fsHelper.searchBFSIds(keyword, rootPath);
    return result;
  }
}
