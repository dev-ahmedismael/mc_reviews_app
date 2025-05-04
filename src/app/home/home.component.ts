import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, NgOptimizedImage, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  branches: any = [];

  ngOnInit(): void {
    this.apiService.index('branches').subscribe({
      next: (res: any) => {
        this.branches = res.data;
      },
    });
  }
}
