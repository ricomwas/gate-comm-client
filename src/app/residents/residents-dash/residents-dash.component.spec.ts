import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsDashComponent } from './residents-dash.component';

describe('ResidentsDashComponent', () => {
  let component: ResidentsDashComponent;
  let fixture: ComponentFixture<ResidentsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentsDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
