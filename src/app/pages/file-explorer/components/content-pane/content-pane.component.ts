import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss'],
})
export class ContentPaneComponent {
  @Input() currentContent!: CurrentContent;
  selectedNode: (IFolderNode | IFileNode) | undefined;
  openProperties = true;
  nodeFocus = false;
  selectedElement: HTMLElement | undefined;
  snackbarOpen = false;
  @ViewChild('properties', { static: true }) propertiesElement!: ElementRef;
  openPropertiesModal: Subject<boolean> = new Subject();

  constructor(
    private fileSystemService: FilesystemService,
    public router: Router
  ) {}

  setSeletedNode(data: { node: IFolderNode | IFileNode; target: HTMLElement }) {
    this.selectedElement = data.target;
    this.selectedNode = data.node;
    this.nodeFocus = true;
  }

  unSelectNode() {
    const propertiesElement = this.propertiesElement.nativeElement;
    window.setTimeout(() => {
      if (
        !(
          this.selectedElement &&
          (document.activeElement == this.selectedElement ||
            document.activeElement == propertiesElement ||
            propertiesElement.contains(document.activeElement))
        )
      ) {
        this.nodeFocus = false;
      }
    }, 0);
  }

  handleShowProperties(val: boolean) {
    this.openProperties = val;
  }

  handleContextMenuAction(type: 'open_properties' | 'delete' | 'rename') {
    if (type == 'open_properties') {
      this.openProperties = true;
      this.openPropertiesModal.next(true);
    }
    if (type == 'delete') {
      this.fileSystemService.fs.deleteNode(
        this.selectedNode!.path + this.selectedNode!.type
      );
      const path = decodeURIComponent(this.router.url);
      this.fileSystemService.updateCurrentContentByPath(path);
      this.snackbarOpen = true;
    }
  }

  snackbarClose() {
    this.snackbarOpen = false;
  }
}
