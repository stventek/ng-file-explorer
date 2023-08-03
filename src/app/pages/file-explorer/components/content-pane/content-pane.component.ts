import { Component, Input } from '@angular/core';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss']
})
export class ContentPaneComponent {
  @Input() currentContent!: (IFolderNode | IFileNode)[];
}
