import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ibox',
  templateUrl: './ibox.component.html',
  styleUrls: ['./ibox.component.css']
})
export class IboxComponent implements OnInit {
  @Input()
  title: String;
  @Input()
  hideTitle: Boolean;
  @Input()
  hideBody: Boolean;
  @Input()
  hideFooter: Boolean = true;

  constructor() { }

  ngOnInit() { }
}
