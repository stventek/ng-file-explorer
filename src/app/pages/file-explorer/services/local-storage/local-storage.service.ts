import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, of } from 'rxjs';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { LocalStorageETL } from '../../utils/localstorage-ETL';
import * as md5 from 'md5';
import { FolderNode } from '../../utils/node';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { FileSystemHelperV2 } from '../../utils/fs';
import { FSData } from '../../interfaces/fs-data.interface';
import { SortParams } from '../../interfaces/sort-params.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { sortParamsSchema, viewModeScema } from '../../utils/json-schemas';
import { ViewMode } from '../../types/file-explorer.type';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  currentContentSource = new BehaviorSubject<CurrentContent>({});
  $currentContent = this.currentContentSource.asObservable();

  graphSource = new BehaviorSubject<FSData | null>(null);
  $graph = this.graphSource.asObservable();
  localStorageETL = new LocalStorageETL();

  sortParamsDefault = {
    sortType: 'name',
    ascending: true,
  } as SortParams;
  sortParamsSource = new BehaviorSubject(this.sortParamsDefault);
  $sortParams = this.sortParamsSource.asObservable();

  viewModeDefault = 'large' as ViewMode;
  viewModeSource = new BehaviorSubject(this.viewModeDefault);
  $viewMode = this.viewModeSource.asObservable();

  constructor(
    private storage: StorageMap,
    private fsHelper: FileSystemHelperV2
  ) {
    const $sortParamsObservable = this.storage
      .get<SortParams>('sortParams', sortParamsSchema)
      .pipe(catchError(() => of<SortParams>(this.sortParamsDefault)));
    const $viewModeObservable = this.storage
      .get<ViewMode>('viewMode', viewModeScema)
      .pipe(catchError(() => of<ViewMode>(this.viewModeDefault)));
    combineLatest([$sortParamsObservable, $viewModeObservable]).subscribe(
      ([sortParamsVal, viewModeVal]) => {
        if (sortParamsVal) this.sortParamsSource.next(sortParamsVal);
        if (viewModeVal) this.viewModeSource.next(viewModeVal);

        const graph = this.localStorageETL.load();
        this.fsHelper.updateGraph(graph);
        this.applyCurrentContentSort();
        this.graphSource.next(graph);
      }
    );
  }

  updateCurrentContent(contentData: Partial<CurrentContent>) {
    const currentValue = this.currentContentSource.getValue();
    if (currentValue)
      this.currentContentSource.next({ ...currentValue, ...contentData });
    else {
      this.currentContentSource.next({ ...contentData });
    }
  }

  sortChildrenBy(sortParams: Partial<SortParams>) {
    const oldSortParams = this.sortParamsSource.getValue();
    const newSortParams = { ...oldSortParams, ...sortParams };
    this.storage.set('sortParams', newSortParams).subscribe();
    this.sortParamsSource.next(newSortParams);
    this.applyCurrentContentSort();
  }

  updateViewMode(mode: ViewMode) {
    this.storage.set('viewMode', mode).subscribe();
    this.viewModeSource.next(mode);
  }

  applyCurrentContentSort() {
    const currentContent = this.currentContentSource.getValue();
    const sortParams = this.sortParamsSource.getValue();
    if (currentContent.parentId) {
      this.fsHelper.sortChildrenBy(
        currentContent.parentId,
        sortParams.sortType,
        sortParams.ascending
      );
      this.graphSource.next(this.fsHelper.getAdjGraph());
    }
  }

  createFolder(name: string) {
    const currentContent = this.currentContentSource.getValue()!;
    if (currentContent.parentId) {
      const newFolder = new FolderNode({
        creatorName: '',
        name: name,
        size: 0,
        parentPath: currentContent.parentId,
        parentID: md5(currentContent.parentId + '__folder__'),
      });
      this.fsHelper.addNode(newFolder);
      this.applyCurrentContentSort();
      this.updateCurrentContent({ selectedNode: newFolder });
    }
  }

  deleteNode(node: IFileNode | IFolderNode) {
    this.fsHelper.deleteNode(node);
    this.applyCurrentContentSort();
  }

  updateNodeByInstance(
    node: IFileNode | IFolderNode,
    data: Partial<IFileNode> | Partial<IFolderNode>
  ) {
    node = this.fsHelper.updateNodeByInstance(node, data);
    this.applyCurrentContentSort();
    this.updateCurrentContent({ selectedNode: node });
  }

  searchBFSIds(keyword: string, rootPath: string) {
    const result = this.fsHelper.searchBFSIds(keyword, rootPath);
    return result;
  }
}
