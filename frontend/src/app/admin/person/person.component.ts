import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonService } from './person.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {
  person = [];
  errors: any = [];
  public dtOptions: DataTables.Settings = {};
  dtTriggerPerson: Subject<any> = new Subject();
  id: number;
  confirmationString = 'New Person has been added';
  isAdded = false;



  constructor(private _personService: PersonService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this._personService.getPersons().subscribe(
        (personApi: any) => {
          this.person = personApi;
          console.log(this.person);

          this.getPerson();
        },
        error => { console.log(error); }
      );

    });
  }
  onDeletePerson(id: Number) {
    this._personService.deletePerson(id).subscribe(

      error => console.log(error)
    );
  }

  addPerson(Person) {
    this._personService.save(Person).subscribe(
      (res: any) => {
        this.isAdded = true
      },
      error => console.log(error)
    )

  }


  getPerson() {
    this._personService.getPersons().subscribe(
      (personApi: any) => {

        this.person = personApi;
        this.dtTriggerPerson.next();
      },
      error => {
        console.log(error);
      }
    );
  }

}