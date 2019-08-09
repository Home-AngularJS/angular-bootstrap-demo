import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowedLanguageComponent } from './allowed-language.component';

describe('AllowedLanguageComponent', () => {
  let component: AllowedLanguageComponent;
  let fixture: ComponentFixture<AllowedLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowedLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowedLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
