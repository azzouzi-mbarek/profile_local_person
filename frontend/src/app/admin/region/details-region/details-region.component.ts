import { Component, OnInit } from '@angular/core';
import { Region } from '../region.model';
import { RegionService } from '../region.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-region',
  templateUrl: './details-region.component.html',
  styleUrls: ['./details-region.component.css']
})
export class DetailsRegionComponent implements OnInit {
  region = new Region();
  private _id: Number;

  constructor(
    private _regionService: RegionService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params) => {
        this._id = +params.get('id');
        this._regionService.getRegion(this._id).subscribe(
          (regionApi: any) => { // @ts-ignore
            this.region = regionApi.data;
          }
        );
      },
      (error) => { console.log(error); }
    );
  }
  retour() {
    this._router.navigate(['administrateur/regions', { id: this._id }], { queryParamsHandling: 'preserve' });
  }

}
