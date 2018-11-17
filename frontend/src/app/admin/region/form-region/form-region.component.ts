import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Region} from '../region.model';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-form-region',
  templateUrl: './form-region.component.html',
  styleUrls: ['./form-region.component.css']
})
export class FormRegionComponent implements OnInit {
  title: String;
  edit: Boolean;
  region: Region;
  errors: any = [];

  public onClose: Subject<Region>;


  constructor(private  _modalRef: BsModalRef) {
  }


  onCancel(): void {
    this._modalRef.hide();
  }

  onConfirm(): void {
    this.onClose.next(this.region);
  }


  ngOnInit() {
    this.onClose = new Subject();
  }

}
