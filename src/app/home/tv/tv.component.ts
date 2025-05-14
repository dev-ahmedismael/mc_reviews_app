import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import 'swiper/element/bundle';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ClockComponent } from '../clock/clock.component';
import { TickerComponent } from './ticker/ticker.component';

@Component({
  selector: 'app-tv',
  imports: [CommonModule, ClockComponent, TickerComponent, NgOptimizedImage],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TvComponent implements OnInit, OnDestroy {
  images: any = [];
  posts: any = [];
  reviewPath = '';
  currentIndex = 0;
  private intervalId: any;

  constructor(private apiService: ApiService, private router: Router) {}

  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 15000);
  }

  ngOnInit(): void {
    const fullPath = this.router.url;
    this.reviewPath = fullPath.replace('/offers', '/review');

    this.apiService.index('offers').subscribe({
      next: (res: any) => {
        const rawImages = res.data.flatMap((offer: any) =>
          offer.images.map((image: string) => ({
            image,
            category_id: offer.category_id,
          }))
        );

        this.images = rawImages;

        this.startCarousel();
      },
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
