import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanMaskedComponent } from './pan-masked.component';

describe('PanMaskedComponent', () => {
  let component: PanMaskedComponent;
  let fixture: ComponentFixture<PanMaskedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanMaskedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanMaskedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
