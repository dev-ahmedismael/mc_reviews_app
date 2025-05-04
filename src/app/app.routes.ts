import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OffersReviewComponent } from './home/offers-review/offers-review.component';
import { OffersComponent } from './home/offers/offers.component';
import { ReviewComponent } from './home/review/review.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'الرئيسية',
  },
  {
    path: 'branch/:id',
    component: OffersReviewComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'offers' },
      {
        path: 'offers',
        component: OffersComponent,
        title: 'العروض',
      },
      {
        path: 'review',
        component: ReviewComponent,
        title: 'التقييم',
      },
    ],
  },
];
