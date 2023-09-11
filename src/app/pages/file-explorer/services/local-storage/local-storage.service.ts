import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { LocalStorageETL } from '../../utils/localstorage-ETL';
import * as md5 from 'md5';
import { FolderNode } from '../../utils/node';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { FileSystemHelperV2 } from '../../utils/fs';
import { FSData } from '../../interfaces/fs-data.interface';
import { SortParams } from '../../interfaces/sort-params.interface';

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
  sortParamsSource = new BehaviorSubject<SortParams>({
    sortType: 'name',
    ascending: true,
  });
  $sortParams = this.sortParamsSource.asObservable();

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

  updateSortParams(sortParams: Partial<SortParams>) {
    const oldSortParams = this.sortParamsSource.getValue();
    const newSortParams = { ...oldSortParams, ...sortParams };
    this.sortParamsSource.next(newSortParams);
    const currentContent = this.currentContentSource.getValue()!;
    if (currentContent.path) {
      this.fsHelper.sortChildsBy(
        currentContent.path,
        newSortParams.sortType,
        newSortParams.ascending
      );
      this.graphSource.next(this.fsHelper.getAdjGraph());
    }
    return newSortParams;
  }

  sortChildsBy(path: string, sortParams: Partial<SortParams>) {
    let newSortParams = this.updateSortParams(sortParams);
    this.fsHelper.sortChildsBy(
      path,
      newSortParams.sortType,
      newSortParams.ascending
    );
    this.graphSource.next(this.fsHelper.getAdjGraph());
  }

  createFolder(name: string) {
    const currentContent = this.currentContentSource.getValue()!;
    if (currentContent.path) {
      const sortParams = this.sortParamsSource.getValue();
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
        sortParams.sortType,
        sortParams.ascending
      );
      this.graphSource.next(this.fsHelper.getAdjGraph());
      this.updateCurrentContent({ selectedNode: newFolder });
    }
  }

  deleteNode(node: IFileNode | IFolderNode) {
    this.fsHelper.deleteNode(node);
    const sortParams = this.sortParamsSource.getValue();
    this.fsHelper.sortChildsBy(
      node.parentPath!,
      sortParams.sortType,
      sortParams.ascending
    );
    this.graphSource.next(this.fsHelper.getAdjGraph());
  }

  updateNodeByInstance(
    node: IFileNode | IFolderNode,
    data: Partial<IFileNode> | Partial<IFolderNode>
  ) {
    node = this.fsHelper.updateNodeByInstance(node, data);
    const sortParams = this.sortParamsSource.getValue();
    this.fsHelper.sortChildsBy(
      node.parentPath!,
      sortParams.sortType,
      sortParams.ascending
    );
    this.graphSource.next(this.fsHelper.getAdjGraph());
    this.updateCurrentContent({ selectedNode: node });
  }

  searchBFSIds(keyword: string, rootPath: string) {
    const result = this.fsHelper.searchBFSIds(keyword, rootPath);
    return result;
  }
}
