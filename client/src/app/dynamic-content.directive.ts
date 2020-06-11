/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[dynamicContent]'
})
export class DynamicContent {

  constructor(private el: ElementRef) { }

  @Input('dynamicContent') dynamicContent: string;

  @HostListener('click', ['$event']) onClick(e) {
    
    if (e.target.classList.contains('handle-link')) {
      let link: string = e.target.innerHTML;

      event.preventDefault();
      event.stopPropagation();
     
      alert("/search/handle/" + link.trim());
      
      //this.router.navigateByUrl("/search/handle/" + link.trim(), { skipLocationChange: false });
      
    } else if (e.target.classList.contains('hashtag-link')) {
      let link: string = e.target.innerHTML;

      event.preventDefault();
      event.stopPropagation();
      
       alert("/search/hashtag/" + link.trim());
       
      //this.router.navigateByUrl("/search/hashtag/" + link.trim(), { skipLocationChange: false }); 
      
    }
    
  }

}