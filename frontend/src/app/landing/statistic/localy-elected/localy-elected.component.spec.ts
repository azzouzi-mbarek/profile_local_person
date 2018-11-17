import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalyElectedComponent } from './localy-elected.component';

describe('LocalyElectedComponent', () => {
  let component: LocalyElectedComponent;
  let fixture: ComponentFixture<LocalyElectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalyElectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalyElectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
