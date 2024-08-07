import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appStampPositioning]'
})
export class StampPositioningDirective {

  constructor() { }

  @HostListener('click', ['$event']) onMouseMove(event: { clientX: any; clientY: any; }) {
    console.log(event.clientX, event.clientY);
  }
}
