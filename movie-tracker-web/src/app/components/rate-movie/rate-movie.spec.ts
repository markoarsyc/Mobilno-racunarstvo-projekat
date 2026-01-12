import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateMovie } from './rate-movie';

describe('RateMovie', () => {
  let component: RateMovie;
  let fixture: ComponentFixture<RateMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateMovie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
