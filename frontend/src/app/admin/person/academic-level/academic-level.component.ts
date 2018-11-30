import { ConfirmModalComponent } from './../../../shared/confirm-modal/confirm-modal.component';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AcademicLevel } from './../../../models/academicLevel.model';
import { AcademicLevelService } from './../../../services/academic_level.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { DataTableDirective } from 'angular-datatables';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-academic-level',
  templateUrl: './academic-level.component.html',
  styleUrls: ['./academic-level.component.css']
})
export class AcademicLevelComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
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
    private _modalService: BsModalService,
    private _toastr:ToastrService) { }

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



  editerAcademicLevel(id :number) {
    console.log('edit',id);
    this._AcademicLevelService.getAcademicLevel(id).subscribe(
      academicData =>{
        this.aca_level= academicData;
        this.ModelFormAcademic(true);
      },
      error => {
        this.errors =error;
      },
    );
   }


  createNavigateur() {
    this.ModelFormAcademic(false);
  }


  ModelFormAcademic(edit: Boolean) {

    const initialState = {
      title: edit ? 'Modifier Niveau Academique' : 'Nouveau Niveau Academique',
      aca_level: edit ? this.aca_level : new AcademicLevel(),
      errors: this.errors,
      edit: edit
    };

    this.bsModalRef = this._modalService.show(ConfirmModalComponent, { initialState });
    if (edit === false) {
      this.bsModalRef.content.onClose.subscribe(
        data => this._AcademicLevelService.save(data)
          .subscribe(
            (data) => {
              this._toastr.success('<h3>Niveau Academique ajouté avec succès</h3>', ' ', {
                'timeOut': 3000,
                'progressBar': true,
                'enableHtml': true
              });
              // renitialiser la liste des Niveau acadimique
              this.getAcademicLevels();
           // vider le Niveau academique
              this.aca_level = new AcademicLevel();
              this.errors = [];
              this.bsModalRef.content.errors = this.errors;
              this.bsModalRef.content.aca_level = this.aca_level;
              this.bsModalRef.hide();
            },
            (error) => {
              this.errors = error.error.errors;
              this.bsModalRef.content.errors = this.errors;
              this.errors = [];
            }
          )
      );


    } else {



      this.bsModalRef.content.onClose.subscribe(
        data => this._AcademicLevelService.update(data)
          .subscribe(
            (data) => {
              this._toastr.warning('<h3>Niveau Academique édité avec succès</h3>', ' ', {
                'timeOut': 3000,
                'progressBar': true,
                'enableHtml': true
              });
              this.getAcademicLevels();

              this.aca_level = new AcademicLevel();
              this.errors = [];
              this.bsModalRef.content.errors = this.errors;
              this.bsModalRef.content.aca_level = this.aca_level;
              this.bsModalRef.hide();
            },
            (error) => {
              this.errors = error.error.errors;
              this.bsModalRef.content.errors = this.errors;
              this.errors = [];
            }
          )
      );


    }






  }





  



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
                console.log(this.aca_levels);
                this.rerender();
                this._toastr.warning('<h3>Niveau Academique supprimé avec succès</h3>', ' ', {
                  'timeOut': 3500,
                  'progressBar': true,
                  'enableHtml': true
                });
              }
            },
            (error) => { console.log(error); }
          );
        }
      }
    );

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
   dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTriggerALevel.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTriggerALevel.unsubscribe();
  }



}
