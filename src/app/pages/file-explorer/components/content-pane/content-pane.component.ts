import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FSData } from '../../interfaces/fs-data.interface';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ItemFocusService } from '../../services/item-focus/item-focus.service';
import { ItemContextMenuService } from '../../services/item-context-menu/item-context-menu.service';
import { ViewMode, contextMenuAction } from '../../types/file-explorer.type';

@Component({
  selector: 'app-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss'],
})
export class ContentPaneComponent implements OnInit {
  openProperties = true;
  snackbarOpen = false;
  openPropertiesModal: Subject<boolean> = new Subject();
  openRenameModal = false;
  $graph: Observable<FSData | null>;
  @Input() currentContent!: CurrentContent;
  parentNode!: string;
  snackbarMessaege = '';
  $viewMode: Observable<ViewMode>;

  constructor(
    private fileSystemService: LocalStorageService,
    private itemFocusService: ItemFocusService,
    private itemContextMenuService: ItemContextMenuService,
    public router: Router
  ) {
    this.$graph = this.fileSystemService.$graph;
    this.$viewMode = this.fileSystemService.$viewMode;
  }

  ngOnInit(): void {
    this.itemContextMenuService.$action.subscribe(action => {
      this.handleContextMenuAction(action);
    });
  }

  handleShowProperties(val: boolean) {
    this.openProperties = val;
  }

  handleContextMenuAction(type: contextMenuAction) {
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

  //if there is a click outside, properties, selected item or search input, unfocus item
  @HostListener('contextmenu', ['$event.target'])
  @HostListener('body:click', ['$event.target'])
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
