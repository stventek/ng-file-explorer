import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ValidateNodeDuplication } from '../../validators/duplicated-node.validator';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-rename-node-modal',
  templateUrl: './rename-node-modal.component.html',
  styleUrls: ['./rename-node-modal.component.scss'],
})
export class RenameNodeModalComponent implements OnInit {
  @Input() open!: boolean;
  @Output() closeModal = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  _node!: IFileNode | IFolderNode;
  @Input() set node(value: IFileNode | IFolderNode) {
    this._node = value;
    if (this.form) this.form.patchValue({ name: value.name });
  }

  get node() {
    return this._node;
  }

  form!: FormGroup;

  namePattern = /^[a-zA-Z0-9_\- .]+$/;

  constructor(
    private fb: FormBuilder,
    private fileSystemService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.namePattern),
          ValidateNodeDuplication(this.fileSystemService),
        ],
      ],
    });
    this.form.patchValue({ name: this.node.name });
  }

  handleClose() {
    if (this.form.valid) {
      this.closeModal.emit(this.form.value.name);
      this.form.reset();
      this.form.patchValue({ name: this.node.name });
    }
  }

  handleCancel() {
    this.form.reset();
    this.form.patchValue({ name: this.node.name });
    this.cancel.emit();
  }
}
