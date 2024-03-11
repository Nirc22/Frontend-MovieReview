import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarReviewComponent } from './actualizar-review.component';

describe('ActualizarReviewComponent', () => {
  let component: ActualizarReviewComponent;
  let fixture: ComponentFixture<ActualizarReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
