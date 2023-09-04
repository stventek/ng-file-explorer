import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateFolderDuplication } from '../../validators/duplicated-node.validator';

@Component({
  selector: 'app-create-folder-modal',
  templateUrl: './create-folder-modal.component.html',
  styleUrls: ['./create-folder-modal.component.scss'],
})
export class CreateFolderModalComponent {
  @Input() open!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  folderNamePattern = /^[a-zA-Z0-9_-]+$/;

  constructor(
    private fileSystemService: LocalStorageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.folderNamePattern),
          ValidateFolderDuplication(this.fileSystemService),
        ],
      ],
    });
  }

  handleClose() {
    if (this.form.valid) {
      const name = this.form.value.name;
      this.fileSystemService.createFolder(name);
      this.form.reset();
      this.closeModal.emit();
    }
  }

  handleCancel() {
    this.form.reset();
    this.cancel.emit();
  }
}
