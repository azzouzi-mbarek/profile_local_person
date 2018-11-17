import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Region } from "../../../models/region.model";
import { Router, ActivatedRoute } from "@angular/router";

import { RegionService } from "../region.service";

@Component({
  selector: "app-display-region",
  templateUrl: "./display-region.component.html",
  styleUrls: ["./display-region.component.css"]
})
export class DisplayRegionComponent implements OnInit {
  @Input()
  searchTerm: String;
  @Input()
  region: Region;
  @Output()
  notifyEdit = new EventEmitter<Number>();
  @Output()
  notifyDelete = new EventEmitter<Number>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _regionService: RegionService
  ) { }

  ngOnInit() { }

  viewDetailsRegion() {
    this._router.navigate([this.region.id], { relativeTo: this._route });
  }

  editRegion() {
    this.notifyEdit.emit(this.region.id);
  }

  deleteRegion() {
    this.notifyDelete.emit(this.region.id);
  }
}
