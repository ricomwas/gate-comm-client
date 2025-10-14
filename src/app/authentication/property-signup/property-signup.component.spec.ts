import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySignupComponent } from './property-signup.component';

describe('PropertySignupComponent', () => {
  let component: PropertySignupComponent;
  let fixture: ComponentFixture<PropertySignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertySignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertySignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
