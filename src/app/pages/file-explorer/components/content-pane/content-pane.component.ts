import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FSData } from '../../interfaces/fs-data.interface';
import * as md5 from 'md5';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss'],
})
export class ContentPaneComponent {
  selectedNode: (IFolderNode | IFileNode) | undefined;
  openProperties = true;
  nodeFocus = false;
  selectedElement: HTMLElement | undefined;
  snackbarOpen = false;
  @ViewChild('properties', { static: true }) propertiesElement!: ElementRef;
  @ViewChild('renameModal', { static: true }) renameModalElement!: ElementRef;
  openPropertiesModal: Subject<boolean> = new Subject();
  openRenameModal = false;
  $graph: Observable<FSData | null>;
  @Input() currentContent!: CurrentContent;
  parentNode!: string;

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
    public router: Router
  ) {
    this.$graph = this.fileSystemService.$graph;
  }

  setSeletedNode(data: { node: IFolderNode | IFileNode; target: HTMLElement }) {
    this.selectedElement = data.target;
    this.selectedNode = data.node;
    this.nodeFocus = true;
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
      this.fileSystemService.deleteNode(this.selectedNode!);
      if (this.snackbarOpen) {
        this.snackbarOpen = false;
        setTimeout(() => {
          this.snackbarOpen = true;
        }, 50);
      } else {
        this.snackbarOpen = true;
      }
    }
  }

  snackbarClose() {
    this.snackbarOpen = false;
  }

  closeRenameModal(name: string) {
    if (name) {
      const path = this.selectedNode!.path + this.selectedNode!.type;
      this.fileSystemService.updateNode(path, { name });
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
  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const propertiesElement = this.propertiesElement.nativeElement;
    const renameModalElement = this.renameModalElement.nativeElement;
    window.setTimeout(() => {
      if (
        !(
          this.selectedElement &&
          (document.activeElement == this.selectedElement ||
            document.activeElement == propertiesElement ||
            (target.id === 'search' && document.activeElement == target) ||
            propertiesElement.contains(document.activeElement) ||
            document.activeElement == renameModalElement ||
            renameModalElement.contains(document.activeElement))
        )
      ) {
        this.nodeFocus = false;
      }
    }, 0);
  }
}
