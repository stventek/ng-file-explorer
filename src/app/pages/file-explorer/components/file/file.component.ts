import { Component, Input } from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  @Input() node!: IFileNode;
}
