import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rename-node-modal',
  templateUrl: './rename-node-modal.component.html',
  styleUrls: ['./rename-node-modal.component.scss'],
})
export class RenameNodeModalComponent {
  @Input() open!: boolean;
  @Output() closeModal = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  @Input() name!: string;

  handleClose() {
    this.closeModal.emit(this.name);
  }

  handleCancel() {
    this.cancel.emit();
  }
}
