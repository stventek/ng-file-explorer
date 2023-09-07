import { Component, HostListener, Input } from '@angular/core';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FSData } from '../../interfaces/fs-data.interface';
import * as md5 from 'md5';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ItemFocusService } from '../../services/item-focus/item-focus.service';

@Component({
  selector: 'app-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss'],
})
export class ContentPaneComponent {
  openProperties = true;
  snackbarOpen = false;
  openPropertiesModal: Subject<boolean> = new Subject();
  openRenameModal = false;
  $graph: Observable<FSData | null>;
  @Input() currentContent!: CurrentContent;
  parentNode!: string;
  snackbarMessaege = '';

  getParentNodeChilds(graph: FSData) {
    const parentId = md5(this.currentContent.path + '__folder__');
    const parentNode = graph[parentId] as IFolderNode | undefined;
    if (parentNode) {
      return parentNode.children;
    }
    return [];
  }

  constructor(
    private fileSystemService: LocalStorageService,
    private itemFocusService: ItemFocusService,
    public router: Router
  ) {
    this.$graph = this.fileSystemService.$graph;
  }

  setSeletedNode(node: IFolderNode | IFileNode) {
    this.fileSystemService.updateCurrentContent({
      selectedNode: node,
    });
    this.itemFocusService.setFocusLost(false);
  }

  handleShowProperties(val: boolean) {
    this.openProperties = val;
  }

  handleContextMenuAction(type: 'open_properties' | 'delete' | 'rename') {
    if (type == 'open_properties') {
      this.openProperties = true;
      this.openPropertiesModal.next(true);
    } else if (type === 'rename') {
      this.openRenameModal = true;
    } else if (type == 'delete') {
      this.fileSystemService.deleteNode(this.currentContent.selectedNode!);
      this.snackbarMessaege = 'File deleted successfully';
      this.openSnackbar();
    }
  }

  openSnackbar() {
    if (this.snackbarOpen) {
      this.snackbarOpen = false;
      setTimeout(() => {
        this.snackbarOpen = true;
      }, 50);
    } else {
      this.snackbarOpen = true;
    }
  }

  snackbarClose() {
    this.snackbarOpen = false;
  }

  closeRenameModal(name: string) {
    if (name) {
      this.fileSystemService.updateNodeByInstance(
        this.currentContent.selectedNode!,
        { name }
      );
      this.snackbarMessaege = 'File updated successfully';
      this.openSnackbar();
    }
    this.openRenameModal = false;
  }

  isFolderNode(node: IFileNode | IFolderNode): node is IFolderNode {
    return node.type === '__folder__';
  }
  isFileNode(node: IFileNode | IFolderNode): node is IFileNode {
    return node.type === '__file__';
  }

  //if there is a click outside, properties, selected item or search input, unfocus item
  @HostListener('contextmenu', ['$event.target'])
  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    window.setTimeout(() => {
      const focusLost = this.itemFocusService.focusLostSource.getValue();
      if (focusLost) {
        this.fileSystemService.updateCurrentContent({
          selectedNode: undefined,
        });
      }
      this.itemFocusService.setFocusLost(true);
    }, 0);
  }

  setFocusLost() {
    this.itemFocusService.setFocusLost(false);
  }
}
