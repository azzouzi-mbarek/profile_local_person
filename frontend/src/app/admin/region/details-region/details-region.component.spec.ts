import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRegionComponent } from './details-region.component';

describe('DetailsRegionComponent', () => {
  let component: DetailsRegionComponent;
  let fixture: ComponentFixture<DetailsRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
