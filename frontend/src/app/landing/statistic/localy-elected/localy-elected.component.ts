import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localy-elected',
  templateUrl: './localy-elected.component.html',
  styleUrls: ['./localy-elected.component.css']
})
export class LocalyElectedComponent implements OnInit {
  tabHover = 'tab1';

  constructor() { }

  ngOnInit() {
  }
  onMouseOver(id) {
    this.tabHover = id;
  }
}
