import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  tabHover = 'tab1';

  constructor() { }

  ngOnInit() {
  }


  onMouseOver(id) {
    this.tabHover = id;
  }

}
