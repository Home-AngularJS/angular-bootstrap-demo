import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptTemplateComponent } from './receipt-template.component';

describe('ReceiptTemplateComponent', () => {
  let component: ReceiptTemplateComponent;
  let fixture: ComponentFixture<ReceiptTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
