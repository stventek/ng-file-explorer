import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-placeholder-properties',
  templateUrl: './placeholder-properties.component.html',
  styleUrls: ['./placeholder-properties.component.scss']
})
export class PlaceholderPropertiesComponent {
  @Output() showProperties = new EventEmitter<boolean>();

  handleCloseProperties(){
    this.showProperties.emit(false);
  }
}
