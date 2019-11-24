import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Component,
  Inject,
  Input,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[bgcolor]',
})
export class BgColorDirective implements OnInit {
  @HostBinding('style.background-color') color: string = 'green';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
  }
}
