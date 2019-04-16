import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltaskPage } from './alltask.page';

describe('AlltaskPage', () => {
  let component: AlltaskPage;
  let fixture: ComponentFixture<AlltaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
