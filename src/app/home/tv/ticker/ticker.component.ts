import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticker',
  imports: [CommonModule],
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.scss',
})
export class TickerComponent implements OnInit {
  newsItems: { post: string; branch_name: string }[] = [];
  @ViewChild('marquee') marquee!: ElementRef;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiService.index('posts').subscribe({
      next: (res: any) => {
        this.newsItems = res.data.map((item: any) => ({
          post: item.post,
          branch_name: item.branch_name,
        }));

        requestAnimationFrame(() => this.setMarqueeSpeed());
      },
    });
  }

  setMarqueeSpeed(): void {
    setTimeout(() => {
      const marqueeEl = this.marquee.nativeElement;
      const trackEl = marqueeEl.querySelector('.ticker-track') as HTMLElement;

      const contentWidth = trackEl.scrollWidth;
      const containerWidth = marqueeEl.clientWidth;
      const duration = (contentWidth / containerWidth) * 20;

      trackEl.style.animationDuration = `${duration}s`;
    }, 300);
  }
}
