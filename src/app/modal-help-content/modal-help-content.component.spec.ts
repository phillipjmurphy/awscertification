import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHelpContentComponent } from './modal-help-content.component';

describe('ModalHelpContentComponent', () => {
  let component: ModalHelpContentComponent;
  let fixture: ComponentFixture<ModalHelpContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHelpContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHelpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
