import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
})
export class ClockComponent implements OnInit, OnDestroy {
  time: string = '';
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      const now = new Date();
      this.time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
