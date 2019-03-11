import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskPage } from './addtask.page';

describe('AddtaskPage', () => {
  let component: AddtaskPage;
  let fixture: ComponentFixture<AddtaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
