import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-development-partners',
  templateUrl: './development-partners.component.html',
  styleUrls: ['./development-partners.component.css']
})
export class DevelopmentPartnersComponent implements OnInit {
  tabHover = 'tab1';

  constructor() { }

  ngOnInit() {
  }
  onMouseOver(id) {
    this.tabHover = id;
  }
}
