import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryLevelService } from 'src/app/services/category-level.service';
import { Subject } from 'rxjs';
import { CategoryLevel } from 'src/app/models/categoryLevel.model';

@Component({
  selector: 'app-category-level',
  templateUrl: './category-level.component.html',
  styleUrls: ['./category-level.component.css']
})
export class CategoryLevelComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtTriggerALevel: Subject<any> = new Subject();
  categoryLevels =[];
  bsModalRef: BsModalRef;
  category_level = new CategoryLevel();
  errors: any[] = [];
  selected = 'selected';
   


  constructor(
    private _categoryLevelService: CategoryLevelService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalService: BsModalService,
    private _toastr:ToastrService
  ) { }

  ngOnInit() {


  }


}
