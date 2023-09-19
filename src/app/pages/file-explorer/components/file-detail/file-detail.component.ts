import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';
import { calculateContextMenuPosition } from '../../utils/context-menu-utils';
import { getIcon } from '../../utils/icon-utils';
import { bytesToSize } from '../../utils/bytes-to-size';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss'],
})
export class FileDetailComponent {
  @Input() nodeFocus!: boolean;
  @ViewChild('fileContextMenu', { static: true }) contextMenuRef!: ElementRef;

  _node!: IFileNode;
  size = '';
  @Input() set node(value: IFileNode) {
    this._node = value;
    this.size = bytesToSize(this._node.size);
  }

  get node() {
    return this._node;
  }

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
