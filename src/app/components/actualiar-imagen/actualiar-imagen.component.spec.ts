import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiarImagenComponent } from './actualiar-imagen.component';

describe('ActualiarImagenComponent', () => {
  let component: ActualiarImagenComponent;
  let fixture: ComponentFixture<ActualiarImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualiarImagenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualiarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
