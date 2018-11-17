import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentPartnersComponent } from './development-partners.component';

describe('DevelopmentPartnersComponent', () => {
  let component: DevelopmentPartnersComponent;
  let fixture: ComponentFixture<DevelopmentPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopmentPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
