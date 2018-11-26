import { Subject } from 'rxjs';
import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  message: String;
  confirmation: boolean;

  public onClose: Subject<boolean>;


  constructor(private _modalRef: BsModalRef) {
  }


  onCancel(): void {

    this.onClose.next(false);
    this._modalRef.hide();
  }

  onConfirm(): void {

    this._modalRef.hide();
    this.onClose.next(true);
  }


  ngOnInit() {
    this.onClose = new Subject();
  }

}
