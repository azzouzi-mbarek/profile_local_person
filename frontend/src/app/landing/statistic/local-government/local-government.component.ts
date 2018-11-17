import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-government',
  templateUrl: './local-government.component.html',
  styleUrls: ['./local-government.component.css']
})
export class LocalGovernmentComponent implements OnInit {
  tabHover = 'tab1';
  constructor() { }

  ngOnInit() {

  }
  onMouseOver(id) {
    this.tabHover = id;
  }

}
