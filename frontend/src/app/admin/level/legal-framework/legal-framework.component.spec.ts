import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalFrameworkComponent } from './legal-framework.component';

describe('LegalFrameworkComponent', () => {
  let component: LegalFrameworkComponent;
  let fixture: ComponentFixture<LegalFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalFrameworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
