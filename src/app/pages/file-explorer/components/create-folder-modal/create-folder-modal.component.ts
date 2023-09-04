import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { FolderNode } from '../../utils/node';
import * as md5 from 'md5';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-create-folder-modal',
  templateUrl: './create-folder-modal.component.html',
  styleUrls: ['./create-folder-modal.component.scss'],
})
export class CreateFolderModalComponent {
  @Input() open!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  name = '';

  constructor(private fileSystemService: LocalStorageService) {}

  handleClose() {
    this.fileSystemService.createFolder(this.name);
    this.name = '';
    this.closeModal.emit();
  }

  handleCancel() {
    this.name = '';
    this.cancel.emit();
  }
}
