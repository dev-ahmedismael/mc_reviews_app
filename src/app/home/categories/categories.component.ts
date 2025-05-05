import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  reviewPath = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const fullPath = this.router.url;
    this.reviewPath = fullPath.replace('/categories', '/review');

    this.apiService.index('categories').subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
    });
  }
}
