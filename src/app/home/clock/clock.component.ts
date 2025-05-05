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
      this.time = now.toLocaleTimeString(); // e.g. "12:34:56 PM"
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Prevent memory leak
  }
}
