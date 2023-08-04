import { Component, Input } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent {
  @Input() node!: IFolderNode;
}
