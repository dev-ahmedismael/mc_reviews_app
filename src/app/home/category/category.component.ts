import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  offers: any = [];
  currentOffer: any = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  touchStartX: number = 0;
  showLightbox: boolean = false;
  currentIndex: number = 0;
  categoriesPath: string = '';
  loading: boolean = true;

  setCurrentOffer(id: string | number) {
    this.currentOffer = this.offers.find((offer: any) => offer.id == id);
  }

  openLightbox(index: number) {
    this.currentIndex = index;
    this.showLightbox = true;
  }

  closeLightbox() {
    this.showLightbox = false;
  }

  nextImage() {
    if (this.currentIndex < this.offers.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchEndX - this.touchStartX;

    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
  }

  ngOnInit(): void {
    const fullUrl = this.router.url;
    this.categoriesPath = fullUrl.split('/').slice(0, -1).join('/');

    this.apiService.index('offers/all').subscribe({
      next: (res: any) => {
        this.loading = false;

        let cat_id = this.route.snapshot.paramMap.get('id');

        let offers = res.data.filter((offer: any) => offer.cat_id == cat_id);

        this.offers = offers;

        this.setCurrentOffer(offers[0].id);
      },
    });
  }
}
