import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit {
  tabHover = 'tab1';

  constructor() { }

  ngOnInit() {
  }
  onMouseOver(id) {
    this.tabHover = id;
  }
}
