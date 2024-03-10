import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsUsuarioComponent } from './reviews-usuario.component';

describe('ReviewsUsuarioComponent', () => {
  let component: ReviewsUsuarioComponent;
  let fixture: ComponentFixture<ReviewsUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
