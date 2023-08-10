import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';

@NgModule({
  declarations: [
    ClickedOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ClickedOutsideDirective]
})
export class SharedModule { }
