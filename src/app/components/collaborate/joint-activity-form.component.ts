import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-joint-activity-form',
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
        <h3 class="text-lg font-semibold text-[#2D3436] mb-2">Proposal Received!</h3>
        <p class="text-sm text-[#5A6B5E]">Thank you for your joint activity proposal. We will be in touch soon.</p>
      </div>
    } @else {
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="grid sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-[#2D3436] mb-1">Project Name *</label>
            <input formControlName="project_name" type="text"
              class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
              [class.border-red-400]="isInvalid('project_name')"
              placeholder="Your project name"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2D3436] mb-1">Contact Person *</label>
            <input formControlName="contact_person" type="text"
              class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
              [class.border-red-400]="isInvalid('contact_person')"
              placeholder="Full name"/>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#2D3436] mb-1">Email Address *</label>
          <input formControlName="email" type="email"
            class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
            [class.border-red-400]="isInvalid('email')"
            placeholder="you@example.com"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#2D3436] mb-1">Activity Idea *</label>
          <textarea formControlName="activity_idea" rows="4"
            class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
            [class.border-red-400]="isInvalid('activity_idea')"
            placeholder="Describe the proposed joint activity…"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#2D3436] mb-1">Proposed Timeline</label>
          <input formControlName="timeline" type="text"
            class="w-full border border-[#E8E4DC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9082]/50"
            placeholder="e.g. Q3 2026"/>
        </div>
        <div class="flex items-start gap-3">
          <input formControlName="consent_given" type="checkbox" id="consent-ja"
            class="mt-1 rounded border-[#E8E4DC] text-[#7C9082] focus:ring-[#7C9082]/50"/>
          <label for="consent-ja" class="text-sm text-[#5A6B5E]">
            I consent to my data being processed for the purpose of this proposal. *
          </label>
        </div>
        @if (showErrors()) {
          <p class="text-sm text-red-600">Please fill in all required fields and give consent.</p>
        }
        <button type="submit"
          class="bg-[#C67B5C] hover:bg-[#A5614A] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Submit Proposal
        </button>
      </form>
    }
  `,
})
export class JointActivityFormComponent {
  submitted = signal(false);
  showErrors = signal(false);

  form = new FormBuilder().group({
    project_name: ['', Validators.required],
    contact_person: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    activity_idea: ['', Validators.required],
    timeline: [''],
    consent_given: [false, Validators.requiredTrue],
  });

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!c && c.invalid && (c.touched || this.showErrors());
  }

  onSubmit() {
    if (this.form.invalid) {
      this.showErrors.set(true);
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
  }
}

