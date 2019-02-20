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
import { AcademicLevelQlService } from 'src/app/graphql_services/academic_level_ql.service';
import { ModelFormAcademicLevelComponent } from '../model-form-academic-level/model-form-academic-level.component';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Subscription } from 'rxjs/internal/Subscription';
import * as academicLevelQueries from './../../../queries/academicLevelQueries';


@Component({
  selector: 'app-academic-level',
  templateUrl: './academic-level.component.html',
  styleUrls: ['./academic-level.component.css']
})
export class AcademicLevelComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  bsModalRef: BsModalRef;
  bsModelConfirm: BsModalRef;
  rows = [];

  academic_levels = [];
  academic_level = new AcademicLevel();
  errors: any[] = [];
  perPage = 5;
  tableMessages = {
    emptyMessage: 'Aucune donnée à afficher',
    totalMessage: 'total'
  };
  loadingIndicator: Boolean = true;
  selected = [];
  public filteredResultats = [];

  private _id: Number;
  private _searchTerm: String;



  get searchTerm(): String {
    return this._searchTerm;
  }

  set searchTerm(value: String) {
    this._searchTerm = value;
    this.filteredResultats = this.filtereResultats(value);
    console.log(value)
  }


  constructor(
    private _AcademicLevelService: AcademicLevelService,
    private __AcademicLevelQlService: AcademicLevelQlService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalService: BsModalService,
    private _toaster: ToastrService) { }

  ngOnInit() {

    this.getAcademicLevels();
    console.log(this.searchTerm)


  }


  filtereResultats(searchString: String) {
    if (searchString === null) {
      return  this.filteredResultats = this.academic_levels;
    } else {

      return this.academic_levels.filter(academic_level =>
        academic_level.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
    }

  }




  getAcademicLevels() {
    this.__AcademicLevelQlService.getAcademicLevels(academicLevelQueries.QUERY_ACADEMIC_LEVELS)
      .valueChanges
      .subscribe(
        (res: any) => {
          this.academic_levels = res.data.AcademicLevels;
          this.rows = [...res.data.AcademicLevels];
          this.loadingIndicator = false;
          console.log(this.academic_levels)
          if (this._route.snapshot.queryParamMap.has('searchTerm')) {
            this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');

          } else if (this.searchTerm) {

            this.filteredResultats = this.filtereResultats(this.searchTerm);

          } else {
            this.filteredResultats = this.rows;

          };

        },
        (error) => { console.log(error); }

      );
  }
  // createAcademicLevel() {
  //   this.openModelFormAcademicLevel();
  // }
  editAcademicLevel(id: number) {
    this.__AcademicLevelQlService.getAcademicLevel(academicLevelQueries.QUERY_ACADEMIC_LEVEL, id).valueChanges
      .subscribe(
        (res: any) => {
          this.academic_level = res.data.AcademicLevelId;
          this.openModelFormAcademicLevel();
          console.log('edit',this.academic_level)
        }
      );
  }


  openModelFormAcademicLevel(academic_level: AcademicLevel = null) {

    // tslint:disable-next-line:no-shadowed-variable
    const initialState = {
      academic_level: academic_level,
    };

    this.bsModalRef = this._modalService.show(ModelFormAcademicLevelComponent, { class: 'modal-lg', initialState });
    this.bsModalRef.content.AcademicLevelSubject.subscribe(
      (res) => {
        console.log(res.edit);
        if (res.edit) {

          this._toaster.info('<h3>Niveau Academique modifiée avec succès</h3>', ' ', {
            'timeOut': 4000,
            'progressBar': true,
            'enableHtml': true
          });
        } else {
          this.academic_levels.push(res.academic_level);
          this.rows = [...this.academic_levels];

          this._toaster.success('<h3>Niveau Academique ajoutée avec succès</h3>', ' ', {
            'timeOut': 3000,
            'progressBar': true,
            'enableHtml': true
          });
        }


      }
    );

  }




  onClickDelete(row) {
    // tslint:disable-next-line:no-shadowed-variable
    const initialState = {
      message: 'Êtes-vous sûr de vouloir supprimer cette Catégorie ?',
      state: 'danger'
    };

    this.bsModelConfirm = this._modalService.show(ConfirmModalComponent, { initialState });

    this.bsModelConfirm.content.onClose.subscribe(
      (response: Boolean) => {
        if (response) {
          this.delete(row);
          this.bsModelConfirm.hide();
        }
      }
    );

  }

  delete(row) {
    this.__AcademicLevelQlService.delete(academicLevelQueries.MUTATION_DELETE_ACADEMIC_LEVEL, row).
      subscribe(
        (res) => {
          const i = this.academic_levels.findIndex(e => e.id === row.id);
          if (i !== -1) {
            this.academic_levels.splice(i, 1);
            this.rows = [...this.academic_levels];


            this._toaster.info('<h3>Niveau Academique supprimée avec succès</h3>', ' ', {
              'timeOut': 3000,
              'progressBar': true,
              'enableHtml': true
            });
          }
        }
      );
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

              const i = this.academic_levels.findIndex(e => e.id === id);
              if (i !== -1) {
                this.academic_levels.splice(i, 1);
                this.rows = [...this.academic_levels];
                console.log(this.academic_levels);
                this.rerender();
                this._toaster.warning('<h3>Niveau Academique supprimé avec succès</h3>', ' ', {
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





  goToAcademicLevelDetails(id) {
    this._router.navigate([id], { relativeTo: this._route });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {

  }






  // openModelFormAcademicLevel(state: Boolean) {
  //   // tslint:disable-next-line:no-shadowed-variable
  //   const initialState = {
  //     title: !state ? 'Ajouter' : 'Éditer',
  //     SubmitBtnTitle: !state ? 'Sauvegarder' : 'Éditer',
  //     academic_level: !state ? new AcademicLevel() : this.academic_level,
  //     state: state
  //   };

  //   if (state) {
  //     this.bsModalRef = this._modalService.show(ModelFormAcademicLevelComponent, { initialState });

  //     this.bsModalRef.content.AcademicLevelSubject.subscribe(
  //       (data) => {
  //         this.__AcademicLevelQlService.save(academicLevelQueries.MUTATION_UPDATE_ACADEMIC_LEVEL, data)
  //           .subscribe(
  //             (res: any) => {
  //               console.log(res.data.updateAcademicLevel);
  //               this.getAcademicLevels();
  //               this.academic_level = new AcademicLevel();
  //               this.errors = [];
  //               this.bsModalRef.content.errors = this.errors;
  //               this.bsModalRef.content.academic_level = this.academic_level;
  //               this.bsModalRef.hide();
  //             }
  //           );


  //       },
  //       (error) => { console.log(error); }
  //     );
  //   } else {

  //     this.bsModalRef = this._modalService.show(ModelFormAcademicLevelComponent, { initialState });

  //     this.bsModalRef.content.AcademicLevelSubject.subscribe(
  //       (data) => {
  //         this.__AcademicLevelQlService.save(academicLevelQueries.MUTATION_CREATE_ACADEMIC_LEVEL, data)
  //           .subscribe(
  //             (res: any) => {
  //               console.log(res.data.createAcademicLevel);
  //               this.getAcademicLevels();
  //               this.academic_level.push(res.data.createAcademicLevel);
  //               this.rows = [...this.academic_level];
      
  //               this._toaster.success('<h3>Niveau Academique ajoutée avec succès</h3>', ' ', {
  //                 'timeOut': 3000,
  //                 'progressBar': true,
  //                 'enableHtml': true
  //               });
  //               this.academic_level = new AcademicLevel();
  //               this.errors = [];
  //               this.bsModalRef.content.errors = this.errors;
  //               this.bsModalRef.content.academic_level = this.academic_level;
  //               this.bsModalRef.hide();
  //             }
  //           );


  //       },
  //       (error) => { console.log(error); }
  //     );




  //   }

  // }





  // editerAcademicLevel(id: number) {
  //   console.log('edit', id);
  //   this._AcademicLevelService.getAcademicLevel(id).subscribe(
  //     academicData => {
  //       this.academic_level = academicData;
  //       this.ModelFormAcademic(true);
  //     },
  //     error => {
  //       this.errors = error;
  //     },
  //   );
  // }


  // createNavigateur() {
  //   this.ModelFormAcademic(false);
  // }


  // ModelFormAcademic(edit: Boolean) {

  //   const initialState = {
  //     title: edit ? 'Modifier Niveau Academique' : 'Nouveau Niveau Academique',
  //     aca_level: edit ? this.academic_level : new AcademicLevel(),
  //     errors: this.errors,
  //     edit: edit
  //   };

  //   this.bsModalRef = this._modalService.show(ConfirmModalComponent, { initialState });
  //   if (edit === false) {
  //     this.bsModalRef.content.onClose.subscribe(
  //       data => this._AcademicLevelService.save(data)
  //         .subscribe(
  //           (data) => {
  //             this._toaster.success('<h3>Niveau Academique ajouté avec succès</h3>', ' ', {
  //               'timeOut': 3000,
  //               'progressBar': true,
  //               'enableHtml': true
  //             });
  //             // renitialiser la liste des Niveau acadimique
  //             this.getAcademicLevels();
  //             // vider le Niveau academique
  //             this.academic_level = new AcademicLevel();
  //             this.errors = [];
  //             this.bsModalRef.content.errors = this.errors;
  //             this.bsModalRef.content.aca_level = this.academic_level;
  //             this.bsModalRef.hide();
  //           },
  //           (error) => {
  //             this.errors = error.error.errors;
  //             this.bsModalRef.content.errors = this.errors;
  //             this.errors = [];
  //           }
  //         )
  //     );


  //   } else {



  //     this.bsModalRef.content.onClose.subscribe(
  //       data => this._AcademicLevelService.update(data)
  //         .subscribe(
  //           (data) => {
  //             this._toaster.warning('<h3>Niveau Academique édité avec succès</h3>', ' ', {
  //               'timeOut': 3000,
  //               'progressBar': true,
  //               'enableHtml': true
  //             });
  //             this.getAcademicLevels();

  //             this.academic_level = new AcademicLevel();
  //             this.errors = [];
  //             this.bsModalRef.content.errors = this.errors;
  //             this.bsModalRef.content.aca_level = this.academic_level;
  //             this.bsModalRef.hide();
  //           },
  //           (error) => {
  //             this.errors = error.error.errors;
  //             this.bsModalRef.content.errors = this.errors;
  //             this.errors = [];
  //           }
  //         )
  //     );


  //   }






  // }











  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
    });
  }

  ngOnDestroy(): void {

    // Do not forget to unsubscribe the event
    this.rerender();
  }



}
