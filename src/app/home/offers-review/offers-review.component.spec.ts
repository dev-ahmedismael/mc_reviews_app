import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersReviewComponent } from './offers-review.component';

describe('OffersReviewComponent', () => {
  let component: OffersReviewComponent;
  let fixture: ComponentFixture<OffersReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
