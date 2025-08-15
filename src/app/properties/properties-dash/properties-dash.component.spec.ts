import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDashComponent } from './properties-dash.component';

describe('PropertiesDashComponent', () => {
  let component: PropertiesDashComponent;
  let fixture: ComponentFixture<PropertiesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
