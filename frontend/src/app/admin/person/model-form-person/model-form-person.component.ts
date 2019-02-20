import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PersonQlService } from 'src/app/graphql_services/person_ql.service';
import { ErrorHandlerService } from 'src/app/graphql_services/error_handler.service';
import * as personQueries from './../../../queries/personQueries';
import * as academicLevelQueries from './../../../queries/academicLevelQueries';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AcademicLevelQlService } from 'src/app/graphql_services/academic_level_ql.service';
import { AcademicLevel } from 'src/app/models/academicLevel.model';
import { ModelFormAcademicLevelComponent } from '../model-form-academic-level/model-form-academic-level.component';

@Component({
  selector: 'app-model-form-person',
  templateUrl: './model-form-person.component.html',
  styleUrls: ['./model-form-person.component.css']
})
export class ModelFormPersonComponent implements OnInit {
  bsModalRefAcademicLevel: BsModalRef;

  // modal params
  model;
  title: String;
  id: number;
  state: Boolean;
  SubmitBtnTitle: String;
  imageUrl = '/assets/img/p8.jpg'

  // person modal parms
  academicLevels: [];
  person: Person;
  errors: any = [];
  PersonSubject: Subject<{}>;

  // form params
  personForm: FormGroup;


  constructor(private _BsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _personQlService: PersonQlService,
    private _academicLevelQlService: AcademicLevelQlService,
    private _fb: FormBuilder,
    private _errorHandler: ErrorHandlerService) { }

  ngOnInit() {

    // initiate forms
    this.personForm = this._fb.group({
      first_name: [''],
      last_name: [''],
      image_url: [''],
      sex: [''],
      birthday: [''],
      profession: [''],
      nationality: [''],
      study_area: [''],
      short_biography: [''],
      email: [''],
      number_phone: [''],
      academic_level_id: [''],
    });
    this.initErrors('first_name');
    // determinate state of modal and initiate person object
    if (this.person) {
      console.log(this.person);

      this.state = this.person !== null ? true : false;
    } else {
      this.person = new Person();
    }

    this.PersonSubject = new Subject();

    this.title = !this.state ? 'Nouveau Personne :' : 'Éditer ' + this.person.first_name + this.person.last_name;
    this.SubmitBtnTitle = !this.state ? 'Sauvegarder' : 'Éditer';

    // get instituion categories

    this._academicLevelQlService.getAcademicLevels(academicLevelQueries.QUERY_ACADEMIC_LEVELS).valueChanges
      .subscribe(
        (res: any) => {
          this.academicLevels = res.data.AcademicLevels;
          console.log(this.academicLevels)
        },
        (errors) => { this._errorHandler.handleError(errors); }
      );


  }

  initErrors(field) {
    this.personForm.get(field).valueChanges.subscribe(
      value => {
        delete this.errors[field];

      }
    );
  }

  onDecline() {
    this._BsModalRef.hide();
  }



  mapFromValueToPerson() {
    this.person.first_name = this.personForm.value.first_name;
    this.person.last_name = this.personForm.value.last_name;
    this.person.image_url = this.personForm.value.image_url;
    this.person.sex = this.personForm.value.sex;
    this.person.birthday = this.personForm.value.birthday;
    this.person.email = this.personForm.value.email;
    this.person.nationality = this.personForm.value.nationality;
    this.person.number_phone = this.personForm.value.number_phone;
    this.person.profession = this.personForm.value.profession;
    this.person.short_biography = this.personForm.value.short_biography;
    this.person.study_area = this.personForm.value.study_area;
    this.person.academic_level_id = this.personForm.value.academic_level_id;

  }





  onSubmit() {
    this.mapFromValueToPerson();
    const mutation = this.state ? personQueries.MUTATION_UPDATE_PERSON : personQueries.MUTATION_CREATE_PERSON;

    this._personQlService.personMutation(mutation, this.person)
      .subscribe(
        (res: any) => {
          const data = {
            person: this.state ? res.data.updatePerson : res.data.createPerson,
            edit: this.state ? true : false
          };
          this.PersonSubject.next(data);
          this._BsModalRef.hide();
          this.person = new Person();

        },
        (errors) => {
          this.errors = this._errorHandler.handleError(errors);
          console.log(this.errors);
        }
      );
  }





  openModalFormAcademicLevel(academic_Level: AcademicLevel = null) {

    // tslint:disable-next-line:no-shadowed-variable
    const initialState = {
      academic_Level: academic_Level,
    };

    this.bsModalRefAcademicLevel = this._modalService.show(ModelFormAcademicLevelComponent, { class: 'modal-lg', initialState });
    this.bsModalRefAcademicLevel.content.AcademicLevelSubject.subscribe(
      (res:any) => {
        console.log(res);
        if (res.edit) {

        } else {
          // this.academicLevels.push(res.data);


          // this._toaster.success('<h3>Catégorie ajoutée avec succès</h3>', ' ', {
          //   'timeOut': 3000,
          //   'progressBar': true,
          //   'enableHtml': true
          // });
        }


      }
    );

  }

}
