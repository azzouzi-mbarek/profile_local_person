import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";

declare let $: any;
@Directive({
  selector: "[easypie]"
})
export class EasyPieDirective implements OnInit {
  constructor(private el: ElementRef) {}

  @Input()
  easypieUpdate;
  @Input()
  options;
  ngOnChanges(changes: SimpleChanges): void {
    this.doChecking();
  }
  ngOnInit() {
    this.doChecking();
  }

  private doChecking() {
    if (this.options) {
      this.createPiewithOptions(this.options);
    } else {
      this.createPie("#eee", "#ccc", "#2196F3", 4, "butt", 148);
    }
  }
  private createPie(
    trackColor,
    scaleColor,
    barColor,
    lineWidth,
    lineCap,
    size
  ) {
    $(this.el.nativeElement).easyPieChart({
      trackColor: trackColor,
      scaleColor: scaleColor,
      barColor: barColor,
      lineWidth: lineWidth,
      lineCap: lineCap,
      size: size
    });
  }

  private createPiewithOptions(options) {
    $(this.el.nativeElement).easyPieChart({
      trackColor: options.trackColor,
      scaleColor: options.scaleColor,
      barColor: options.barColor,
      lineWidth: options.lineWidth,
      lineCap: options.lineCap,
      size: options.size
    });
  }
}
