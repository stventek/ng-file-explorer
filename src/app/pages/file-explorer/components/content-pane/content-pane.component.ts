import { Component, Input } from '@angular/core';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { CurrentContent } from '../../interfaces/current-content.interface';

@Component({
  selector: 'app-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss']
})
export class ContentPaneComponent {
  @Input() currentContent!: CurrentContent;
  selectedNode: (IFolderNode | IFileNode) | undefined;

  setSeletedNode(node: (IFolderNode | IFileNode)){
    console.log(node);
    this.selectedNode = node;
  }
}
