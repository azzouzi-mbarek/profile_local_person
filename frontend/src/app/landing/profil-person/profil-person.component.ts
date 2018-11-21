import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-person',
  templateUrl: './profil-person.component.html',
  styleUrls: ['./profil-person.component.css']
})
export class ProfilPersonComponent implements OnInit {
  person = [];
  dtTriggerPerson: Subject<any> = new Subject();
  level_id: number;
  person_id: number;
  country_id: number;



  constructor(private _personService:PersonService,private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.person_id = +params.get('id');
      this._route.queryParamMap.subscribe(params => {
        this.level_id = +params.get('l');
      this.country_id=+params.get('c');
      });
      console.log(params);
      console.log('profil person comp',this.person_id);
      
      this._personService.getPersonLevel(this.country_id, this.level_id,this.person_id).subscribe(
        (personApi: any) => {
          this.person = personApi.data;
          this.getPerson();

        },
        error => { console.log(error); }
      );

    });
  }


  getPerson() {
    this._personService.getPersonLevel(this.country_id, this.level_id,this.person_id).subscribe(
      (personApi: any) => {

        this.person = personApi.data;
        console.log(this.person);
        this.dtTriggerPerson.next();
      },
      error => {
        console.log(error);
      }
    );
  }

}
