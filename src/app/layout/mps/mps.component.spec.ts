import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpsComponent } from './mps.component';

describe('MpsComponent', () => {
  let component: MpsComponent;
  let fixture: ComponentFixture<MpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
