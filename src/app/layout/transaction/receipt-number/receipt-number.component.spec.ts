import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptNumberComponent } from './receipt-number.component';

describe('ReceiptNumberComponent', () => {
  let component: ReceiptNumberComponent;
  let fixture: ComponentFixture<ReceiptNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
