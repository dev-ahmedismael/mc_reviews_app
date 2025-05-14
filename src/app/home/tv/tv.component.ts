import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import 'swiper/element/bundle';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-tv',
  imports: [CommonModule, ClockComponent],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TvComponent implements OnInit, AfterViewInit {
  images: any = [];
  posts: any = [];
  init: boolean = false;
  newsItems: { post: string; branch_name: string }[] = [];
  reviewPath = '';

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;
  @ViewChild('marquee') marquee!: ElementRef;

  setMarqueeSpeed(): void {
    const marqueeEl = this.marquee.nativeElement;
    const trackEl = marqueeEl.querySelector('.ticker-track') as HTMLElement;

    // Get content width dynamically
    const contentWidth = trackEl.scrollWidth;
    const containerWidth = marqueeEl.clientWidth;

    // Calculate speed: Adjust duration based on content size
    const duration = (contentWidth / containerWidth) * 20;

    // Apply speed to animation
    trackEl.style.animationDuration = `${duration}s`;
  }

  ngOnInit(): void {
    const fullPath = this.router.url;
    this.reviewPath = fullPath.replace('/offers', '/review');

    this.apiService.index('offers').subscribe({
      next: (res: any) => {
        this.images = res.data.flatMap((offer: any) =>
          offer.images.map((image: string) => ({
            image,
            category_id: offer.category_id,
          }))
        );
      },
    });

    this.apiService.index('posts').subscribe({
      next: (res: any) => {
        this.newsItems = res.data.map((item: any) => ({
          post: item.post,
          branch_name: item.branch_name,
        }));
        setTimeout(() => {
          this.setMarqueeSpeed();
        }, 2000);
      },
    });
  }

  ngAfterViewInit(): void {
    this.init = true;
  }
}
