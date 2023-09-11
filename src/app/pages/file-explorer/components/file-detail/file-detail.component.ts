import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';
import { calculateContextMenuPosition } from '../../utils/context-menu-utils';
import { getIcon } from '../../utils/icon-utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss'],
})
export class FileDetailComponent {
  @Input() node!: IFileNode;
  @Input() nodeFocus!: boolean;
  @ViewChild('fileContextMenu', { static: true }) contextMenuRef!: ElementRef;

  isContextMenuOpen = false;
  contextMenuStyles: any;

  constructor(private cdr: ChangeDetectorRef) {}

  getIcon() {
    return getIcon(this.node.name);
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.isContextMenuOpen = true;
    //update template
    this.cdr.detectChanges();
    this.contextMenuStyles = calculateContextMenuPosition(
      event,
      this.contextMenuRef
    );
  }

  onClickedOutside(e: any) {
    this.isContextMenuOpen = false;
  }

  handleContextMenuAction() {
    this.isContextMenuOpen = false;
  }
}
