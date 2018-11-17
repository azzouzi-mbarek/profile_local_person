import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLocalComponent } from './profile-local.component';

describe('ProfileLocalComponent', () => {
  let component: ProfileLocalComponent;
  let fixture: ComponentFixture<ProfileLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
