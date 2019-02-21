import { Component, OnInit } from '@angular/core';
import { AcademicLevel } from 'src/app/models/academicLevel.model';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import * as academicLevelQueries from './../../../queries/academicLevelQueries';
import { AcademicLevelQlService } from 'src/app/graphql_services/academic_level_ql.service';
import { ErrorHandlerService } from 'src/app/graphql_services/error_handler.service';
import { FormGroup, FormBuilder,ReactiveFormsModule, FormControl } from '@angular/forms';



@Component({
  selector: 'app-model-form-academic-level',
  templateUrl: './model-form-academic-level.component.html',
  styleUrls: ['./model-form-academic-level.component.css']
})
export class ModelFormAcademicLevelComponent implements OnInit {
  // modal parms
  title: String;
  id: number;
  state: Boolean;
  SubmitBtnTitle: String;


  academic_level: AcademicLevel;
  errors: any = [];
  AcademicLevelSubject: Subject<{}>;
  // form category
  AcademicLevelForm: FormGroup;

  constructor(private _BsModalRef: BsModalRef,
    private _academiqueLevelService: AcademicLevelQlService,
    private _errorHandler: ErrorHandlerService,
    private _fb: FormBuilder) { }

  ngOnInit() {
 


    this.AcademicLevelForm = this._fb.group({
      name: [''],
      bac_level: [''],
    });


    this.initErrors('name');


    if (this.academic_level) {
      console.log(this.academic_level);

      this.state = this.academic_level !== null ? true : false;
    } else {
      this.academic_level = new AcademicLevel();
    }

    this.AcademicLevelSubject = new Subject();

    this.title = !this.state ? 'Nouveau Niveau Academique :' : 'Éditer ' + this.academic_level.name + this.academic_level.bac_level;
    this.SubmitBtnTitle = !this.state ? 'Sauvegarder' : 'Éditer';

    this.AcademicLevelForm.patchValue(this.academic_level);



  }



  initErrors(field) {
    this.AcademicLevelForm.get(field).valueChanges.subscribe(
      value => {
        delete this.errors['name'];
        console.log(this.errors);
      }
    );
  }

  onDecline() {
    this._BsModalRef.hide();
  }

  mapFromValueToAcademicLevel() {
    this.academic_level.name = this.AcademicLevelForm.value.name;
    this.academic_level.bac_level = this.AcademicLevelForm.value.bac_level;
  }
  onSubmit() {
    this.mapFromValueToAcademicLevel()
    const mutation = this.state ? academicLevelQueries.MUTATION_UPDATE_ACADEMIC_LEVEL : academicLevelQueries.MUTATION_CREATE_ACADEMIC_LEVEL;

    this._academiqueLevelService.academiqueLevelMutation(mutation, this.academic_level)
      .subscribe(
        (res: any) => {
          const data = {
            academic_level: this.state ? res.data.updateAcademicLevel : res.data.createAcademicLevel,
            edit: this.state ? true : false
          };
          this.AcademicLevelSubject.next(data);
          this._BsModalRef.hide();
          this.academic_level = new AcademicLevel();

        },
        (errors) => {
          this.errors = this._errorHandler.handleError(errors);
          console.log(this.errors);
        }
      );
  }

}
