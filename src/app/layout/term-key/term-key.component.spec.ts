import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermKeyComponent } from './term-key.component';

describe('TermKeyComponent', () => {
  let component: TermKeyComponent;
  let fixture: ComponentFixture<TermKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
