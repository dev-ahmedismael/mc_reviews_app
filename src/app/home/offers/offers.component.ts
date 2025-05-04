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
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-offers',
  imports: [RouterLink, CommonModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OffersComponent implements OnInit, AfterViewInit {
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
      },
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl = this.swiperRef.nativeElement as HTMLElement & {
        initialize: () => void;
      };

      customElements.whenDefined('swiper-container').then(() => {
        Object.assign(swiperEl, {
          on: {
            init() {
              console.log('Swiper initialized!');
            },
          },
        });
        swiperEl.initialize();
      });
    }
  }
}
