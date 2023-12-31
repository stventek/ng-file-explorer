import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ItemFocusService } from '../../services/item-focus/item-focus.service';
import { ItemContextMenuService } from '../../services/item-context-menu/item-context-menu.service';
import { Observable } from 'rxjs';
import { FSData } from '../../interfaces/fs-data.interface';
import { CurrentContent } from '../../interfaces/current-content.interface';
import * as md5 from 'md5';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.scss'],
})
export class DetailContentComponent {
  $graph: Observable<FSData | null>;
  $currentContent: Observable<CurrentContent | null>;
  constructor(
    private fileSystemService: LocalStorageService,
    private itemFocusService: ItemFocusService,
    private itemContextMenuService: ItemContextMenuService
  ) {
    this.$graph = this.fileSystemService.$graph;
    this.$currentContent = this.fileSystemService.$currentContent;
  }

  getParentNodeChilds(graph: FSData) {
    const currentContent =
      this.fileSystemService.currentContentSource.getValue();
    if (currentContent) {
      const parentNode = graph[currentContent.parentId!] as
        | IFolderNode
        | undefined;
      if (parentNode) {
        return parentNode.children;
      }
    }
    return [];
  }

  setSeletedNode(node: IFolderNode | IFileNode) {
    this.fileSystemService.updateCurrentContent({
      selectedNode: node,
    });
    this.itemFocusService.setFocusLost(false);
  }

  isFolderNode(node: IFileNode | IFolderNode): node is IFolderNode {
    return node.type === '__folder__';
  }
  isFileNode(node: IFileNode | IFolderNode): node is IFileNode {
    return node.type === '__file__';
  }
}
