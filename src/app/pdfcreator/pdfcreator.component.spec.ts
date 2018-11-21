import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFcreatorComponent } from './pdfcreator.component';

describe('PDFcreatorComponent', () => {
  let component: PDFcreatorComponent;
  let fixture: ComponentFixture<PDFcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDFcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
