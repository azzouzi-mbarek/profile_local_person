import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationToolsComponent } from './communication-tools.component';

describe('CommunicationToolsComponent', () => {
  let component: CommunicationToolsComponent;
  let fixture: ComponentFixture<CommunicationToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
