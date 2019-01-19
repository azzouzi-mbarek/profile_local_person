import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {


  public itemsProgramme: string[] = ["Programmme d'insertion des jeunes",
    'Programme Rabat city urbanisation',
    'Programme Know your city',
    'Programme rabat Green city',
    'Projet Ensemble protegeons la ville',
     'autre'];
  public itemsCategorie: string[] =[
    "Projet/Programmes relatifs aux ODDs",
    "Projet/Programmes relatifs au Climat change"
  ];
    public ngxDisabled = false;


  constructor() { }

  ngOnInit() {
  }

}
