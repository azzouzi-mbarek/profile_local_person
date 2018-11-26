import { ConfirmModalComponent } from './../../../shared/confirm-modal/confirm-modal.component';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AcademicLevel } from './../../../models/academicLevel.model';
import { AcademicLevelService } from './../../../services/academic_level.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-academic-level',
  templateUrl: './academic-level.component.html',
  styleUrls: ['./academic-level.component.css']
})
export class AcademicLevelComponent implements OnInit {

  aca_levels = [];
  aca_level = new AcademicLevel();
  errors: any[] = [];
  selected = 'selected';

  public dtOptions: DataTables.Settings = {};
  dtTriggerALevel: Subject<any> = new Subject();
  bsModalRef: BsModalRef;


  constructor(
    private _AcademicLevelService: AcademicLevelService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalService: BsModalService) { }

  ngOnInit() {

    this.getAcademicLevels();

  }

  getAcademicLevels() {
    this._AcademicLevelService.getAcademicLevels().subscribe(
      (aca_levelApi: any) => {
        this.aca_levels = aca_levelApi.data;
        this.dtTriggerALevel.next();
      },
      (error) => { console.log(error); }
    );
  }


  goToAcademicLevelDetails(id) {
    this._router.navigate([id], { relativeTo: this._route });
  }



  editerAcademicLevel() { }

  deleteAcademicLevel(id) {

    const initialState = {
      message: 'etes vous sur ?',
      confirmation: null
    };
    this.bsModalRef = this._modalService.show(ConfirmModalComponent, { initialState });

    this.bsModalRef.content.onClose.subscribe(
      (data) => {
        if (data) {

          this._AcademicLevelService.deleteAcademicLevel(id).subscribe(
            (reponse: any) => {

              const i = this.aca_levels.findIndex(e => e.id === id);
              if (i !== -1) {
                this.aca_levels.splice(i, 1);
              }
            },
            (error) => { console.log(error); }
          );
        }
      }
    );


  }





}
