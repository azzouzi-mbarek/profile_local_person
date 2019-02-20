import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonQlService } from 'src/app/graphql_services/person_ql.service';
import * as personQueries from './../../queries/personQueries';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Person } from 'src/app/models/person.model';
import { ToastrService } from 'ngx-toastr';
import { ModelFormPersonComponent } from './model-form-person/model-form-person.component';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {
  bsModalRef: BsModalRef;
  bsModelConfirm: BsModalRef;

  persons = [];
  person = new Person();
  errors: any[] = [];
  id: number;
  confirmationString = 'New Person has been added';
  isAdded = false;
  loadingIndicator: Boolean = true;
  rowsPersons = [];
  perPage = 5;
  tableMessages = {
    emptyMessage: 'Aucune donnée à afficher',
    totalMessage: 'total'
  };
  selected = [];
  public filteredResultats = [];

  private _id: Number;
  private _searchTerm: String;



  get searchTerm(): String {
    return this._searchTerm;
  }

  set searchTerm(value: String) {
    this._searchTerm = value;
    // this.filteredResultats = this.filtereResultats(value);
    console.log(value)
  }



  constructor(private _personQLService: PersonQlService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalService: BsModalService,
    private _toaster: ToastrService
  ) { }

  ngOnInit() {
    this.getPersons()
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {

  }

  // filtereResultats(value:string){

  // }


  // onDeletePerson(id: Number) {
  //   this._p.deletePerson(id).subscribe(

  //     error => console.log(error)
  //   );
  // }

  // addPerson(Person) {
  //   this._personService.save(Person).subscribe(
  //     (res: any) => {
  //       this.isAdded = true
  //     },
  //     error => console.log(error)
  //   )

  // }


  // getPerson() {
  //   this._personService.getPersons().subscribe(
  //     (personApi: any) => {

  //       this.person = personApi;
  //       this.dtTriggerPerson.next();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  getPersons() {
    this._personQLService.getPersons(personQueries.QUERY_PERSONS)
      .valueChanges
      .subscribe(
        (res: any) => {
          console.log(res.data.Persons)

          this.persons = res.data.Persons;
          this.rowsPersons = [...res.data.Persons];
          this.loadingIndicator = false;
          // if (this._route.snapshot.queryParamMap.has('searchTerm')) {
          //   this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');

          // } else if (this.searchTerm) {

          //   this.filteredResultats = this.filtereResultats(this.searchTerm);

          // } else {
          //   this.filteredResultats = this.rows;

          // };

        },
        (error) => { console.log(error); }

      );
  }

  onClickDelete(row) {

  }

  openModalFormPerson(person: Person = null) {

    // tslint:disable-next-line:no-shadowed-variable
    const initialState = {
      person: person,
    };
    this.bsModalRef = this._modalService.show(ModelFormPersonComponent, { class: 'modal-lg', initialState });
    this.bsModalRef.content.PersonSubject.subscribe(

      (res) => {
        console.log(res.edit);
        if (res.edit) {

          this._toaster.info('<h3>Personne modifiée avec succès</h3>', ' ', {
            'timeOut': 4000,
            'progressBar': true,
            'enableHtml': true
          });
        } else {
          this.persons.push(res.person);
          this.rowsPersons = [...this.persons];

          this._toaster.success('<h3>Personne ajoutée avec succès</h3>', ' ', {
            'timeOut': 3000,
            'progressBar': true,
            'enableHtml': true
          });
        }


      }
    );

  }

}