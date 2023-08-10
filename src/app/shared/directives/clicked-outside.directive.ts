import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective {

  constructor(private el: ElementRef) { }

  @Output() public clickedOutside = new EventEmitter();

  @HostListener('document:contextmenu', ['$event.target'])
  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
      const clickedInside = this.el.nativeElement.parentNode.contains(target);
      if (!clickedInside) {
        console.log('test');
        this.clickedOutside.emit(target);
      }
  }

}
