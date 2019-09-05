import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpsKeyComponent } from './ips-key.component';

describe('IpsKeyComponent', () => {
  let component: IpsKeyComponent;
  let fixture: ComponentFixture<IpsKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpsKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpsKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
