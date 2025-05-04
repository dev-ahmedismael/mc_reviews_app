import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-review',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    Toast,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  reviewOptions: any = [];
  private inactivityTimeout: any;
  private readonly timeoutDuration = 10000;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      employee_code: ['', Validators.required],
      value: ['', Validators.required],
      notes: [''],
    });
  }

  selectReview(value: number) {
    this.form.get('value')?.setValue(value);
  }

  get reviewValue(): number {
    return this.form.get('value')?.value;
  }

  submit() {
    if (this.form.valid) {
      const path = this.router.url;
      const match = path.match(/\/branch\/(\d+)/);
      const branch_id = match ? match[1] : null;

      let data = this.form.value;
      data.branch_id = branch_id;

      this.apiService.store('reviews', data).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: res.message,
          });
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: err.error.message,
          });
        },
      });
    }
  }

  ngOnInit(): void {
    this.reviewOptions = [
      {
        value: 4,
        icon: '/images/r/4.svg',
        color: 'text-green-800',
        label: 'راضي جداً',
      },
      {
        value: 3,
        icon: '/images/r/3.svg',
        color: 'text-green-500',
        label: 'راضي',
      },
      {
        value: 2,
        icon: '/images/r/2.svg',
        color: 'text-yellow-500',
        label: 'محايد',
      },
      {
        value: 1,
        icon: '/images/r/1.svg',
        color: 'text-red-600',
        label: 'غير راضي',
      },
    ];

    this.resetTimer();
    this.registerActivityListeners();
  }
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      this.removeActivityListeners();
      clearTimeout(this.inactivityTimeout);
    }
  }
  private registerActivityListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.resetTimer);
      window.addEventListener('keydown', this.resetTimer);
      window.addEventListener('click', this.resetTimer);
      window.addEventListener('touchstart', this.resetTimer);
    }
  }

  private removeActivityListeners() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.resetTimer);
      window.removeEventListener('keydown', this.resetTimer);
      window.removeEventListener('click', this.resetTimer);
      window.removeEventListener('touchstart', this.resetTimer);
    }
  }

  private resetTimer = () => {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.handleInactivity();
    }, this.timeoutDuration);
  };

  private handleInactivity() {
    const fullPath = this.router.url;
    let reviewPath = fullPath.replace('/review', '/offers');

    this.router.navigateByUrl(reviewPath);
  }
}
