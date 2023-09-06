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
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent {
  @Input() node!: IFileNode;
  @Input() nodeFocus!: boolean;
  @ViewChild('fileContextMenu', { static: true }) contextMenuRef!: ElementRef;
  @Output() contextMenuAction = new EventEmitter<
    'open_properties' | 'delete' | 'rename'
  >();

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

  handleContextMenuAction(type: 'open_properties' | 'delete' | 'rename') {
    this.isContextMenuOpen = false;
    this.contextMenuAction.emit(type);
  }
}
