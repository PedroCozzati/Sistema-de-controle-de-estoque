import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[appHighlight]'
  })
  export class HighlightDirective implements OnInit{
    
    @Input() appHighlight: any;
    
    constructor( private element: ElementRef) { }
   
    ngOnInit(){
      this.element.nativeElement.setAttribute(this.appHighlight, '');
    }
  }