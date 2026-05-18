import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

const INTEREST_OPTIONS = [
  'Just Transition', 'Digital Inclusion', 'Green Skills', 'Social Innovation',
  'Policy Development', 'Community Engagement', 'Research & Data',
];

@Component({
  selector: 'app-network-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @if (submitted()) {
      <div class="rounded-xl bg-[#7C9082]/10 border border-[#7C9082]/20 p-8 text-center">
        <div class="w-12 h-12 rounded-full bg-[#7C9082] flex items-center justify-center mx-auto mb-4">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-[#2D3436] mb-2">Application Received!</h3>
        <p class="text-sm text-[#5A6B5E]">Thank you for applying to join the network. We will review your application shortly.</p>
      </div>
    } @else {
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="grid sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-[#2D3436] mb-1">Full Name *</label>
            <input formControlName="name" type="text"
              class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
              [class.border-red-400]="isInvalid('name')"
              placeholder="Your full name"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2D3436] mb-1">Organisation *</label>
            <input formControlName="organisation" type="text"
              class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
              [class.border-red-400]="isInvalid('organisation')"
              placeholder="Organisation name"/>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-[#2D3436] mb-1">Role</label>
            <input formControlName="role" type="text"
              class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
              placeholder="Your role"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2D3436] mb-1">Email Address *</label>
            <input formControlName="email" type="email"
              class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
              [class.border-red-400]="isInvalid('email')"
              placeholder="you@example.com"/>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#2D3436] mb-2">Areas of Interest</label>
          <div class="flex flex-wrap gap-2">
            @for (option of interestOptions; track option) {
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox"
                  [checked]="isSelected(option)"
                  (change)="toggleInterest(option)"
                  class="rounded border-[#E8E4DC] text-[#7C9082] focus:ring-[#7C9082]/50"/>
                <span class="text-sm text-[#5A6B5E]">{{ option }}</span>
              </label>
            }
          </div>
        </div>
        <div class="flex items-start gap-3">
          <input formControlName="consent_given" type="checkbox" id="consent-net"
            class="mt-1 rounded border-[#E8E4DC] text-[#7C9082] focus:ring-[#7C9082]/50"/>
          <label for="consent-net" class="text-sm text-[#5A6B5E]">
            I consent to my data being processed for network membership purposes. *
          </label>
        </div>
        @if (showErrors()) {
          <p class="text-sm text-red-600">Please fill in all required fields and give consent.</p>
        }
        @if (submitError()) {
          <p class="text-sm text-red-600">Something went wrong. Please try again later.</p>
        }
        <button type="submit" [disabled]="sending()"
          class="bg-[#7C9082] hover:bg-[#5A6B5E] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
          {{ sending() ? 'Sending…' : 'Join the Network' }}
        </button>
      </form>
    }
  `,
})
export class NetworkFormComponent {
  private emailService = inject(EmailService);

  submitted = signal(false);
  showErrors = signal(false);
  sending = signal(false);
  submitError = signal(false);
  selectedInterests = signal<string[]>([]);
  readonly interestOptions = INTEREST_OPTIONS;

  form = new FormBuilder().group({
    name: ['', Validators.required],
    organisation: ['', Validators.required],
    role: [''],
    email: ['', [Validators.required, Validators.email]],
    consent_given: [false, Validators.requiredTrue],
  });

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!c && c.invalid && (c.touched || this.showErrors());
  }

  isSelected(option: string): boolean {
    return this.selectedInterests().includes(option);
  }

  toggleInterest(option: string) {
    this.selectedInterests.update(list =>
      list.includes(option) ? list.filter(o => o !== option) : [...list, option]
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.showErrors.set(true);
      this.form.markAllAsTouched();
      return;

    }

    const v = this.form.getRawValue();
    this.sending.set(true);
    this.submitError.set(false);

    this.emailService.sendNetworkApplication({
      name: v.name ?? '',
      organisation: v.organisation ?? '',
      role: v.role ?? '',
      email: v.email ?? '',
      interests: this.selectedInterests().join(', ') || 'None selected',
    }).subscribe({
      next: () => { this.sending.set(false); this.submitted.set(true); },
      error: () => { this.sending.set(false); this.submitError.set(true); },
    });
  }
}
