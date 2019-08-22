import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMaskGroupComponent } from './card-mask-group.component';

describe('CardMaskGroupComponent', () => {
  let component: CardMaskGroupComponent;
  let fixture: ComponentFixture<CardMaskGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMaskGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMaskGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
