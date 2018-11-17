import { RegionService } from './../../services/region.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-modal-select-country',
  templateUrl: './modal-select-country.component.html',
  styleUrls: ['./modal-select-country.component.css']
})
export class ModalSelectCountryComponent implements OnInit {
  public onClose: Subject<any>;
  title: String;
  countries: any;
  regions: any;





  constructor(private _modalRef: BsModalRef,
    private _regionService: RegionService,
    private _countryService: CountryService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  gotoCountryDetails(id) {
    this._modalRef.hide();
    this._router.navigate(['landing/statistic/country', id]);

  }

  onCancel(): void {
    this._modalRef.hide();
  }

  onConfirm(): void {
    // this.onClose.next(this.region);
  }

  ngOnInit() {
    this.countries.forEach(element => {
      console.log(element.properties.name);
    });
    this._regionService.getRegions().subscribe((region: any) => {
      this.regions = region.data;

    });

    this.onClose = new Subject();
  }


}
