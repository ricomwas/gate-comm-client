import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentSignupComponent } from './resident-signup.component';

describe('ResidentSignupComponent', () => {
  let component: ResidentSignupComponent;
  let fixture: ComponentFixture<ResidentSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
