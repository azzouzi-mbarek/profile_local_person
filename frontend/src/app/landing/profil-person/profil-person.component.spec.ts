import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPersonComponent } from './profil-person.component';

describe('ProfilPersonComponent', () => {
  let component: ProfilPersonComponent;
  let fixture: ComponentFixture<ProfilPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
