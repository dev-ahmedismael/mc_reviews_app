import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OffersReviewComponent } from './home/offers-review/offers-review.component';
import { OffersComponent } from './home/offers/offers.component';
import { ReviewComponent } from './home/review/review.component';
import { provideServerRendering } from '@angular/platform-server';
import { TvComponent } from './home/tv/tv.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { CategoryComponent } from './home/category/category.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'الرئيسية',
  },
  {
    path: 'tv',
    component: TvComponent,
    title: 'عيادات ماسترز كلينيك',
  },
  {
    path: 'branch/:id',
    component: OffersReviewComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'categories' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'الأقسام الطبية',
      },
      {
        path: 'categories/:id',
        component: CategoryComponent,
      },
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
