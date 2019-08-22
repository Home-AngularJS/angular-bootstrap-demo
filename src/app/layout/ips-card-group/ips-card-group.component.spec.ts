import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpsCardGroupComponent } from './ips-card-group.component';

describe('IpsCardGroupComponent', () => {
  let component: IpsCardGroupComponent;
  let fixture: ComponentFixture<IpsCardGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpsCardGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpsCardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
