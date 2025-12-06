import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNonRendu]'
})
export class NonRendu {
  el: any;
  constructor(el : ElementRef) {
      this.el = el.nativeElement;
      this.el.style.backgroundColor = 'red';
      this.el.style.border = '2px solid black';
      this.el.style.display = 'flex';
      this.el.style.justifyContent = 'center';
      this.el.style.cursor = 'pointer';
   }


   @HostListener('mouseenter') onMouseEnter() {
    this.el.style.transform = 'scale(1.02)';
    this.el.style.transition = 'transform 0.3s ease-in-out';
   }

    @HostListener('mouseleave') onMouseLeave() {
    this.el.style.transform = 'scale(1)';
    this.el.style.transition = 'transform 0.3s ease-in-out';
   }

}
