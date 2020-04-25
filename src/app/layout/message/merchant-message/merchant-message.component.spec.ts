import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantMessageComponent } from './merchant-message.component';

describe('MerchantMessageComponent', () => {
  let component: MerchantMessageComponent;
  let fixture: ComponentFixture<MerchantMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
