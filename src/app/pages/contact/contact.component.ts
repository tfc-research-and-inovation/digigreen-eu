import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/shared/page-header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <div>
      <app-page-header title="Contact" subtitle="Get in touch with the DigiGreenTT team." breadcrumb="Contact"/>
      <section class="py-16 md:py-24">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white rounded-xl border border-[#E8E4DC] p-6">
              <h3 class="text-base font-semibold text-[#2D3436] mb-4">General Enquiries</h3>
              <a href="mailto:contact@tfcengage.com"
                 class="flex items-center gap-2 text-sm text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                contact&#64;tfcengage.com
              </a>
            </div>
            <div class="bg-white rounded-xl border border-[#E8E4DC] p-6">
              <h3 class="text-base font-semibold text-[#2D3436] mb-4">Project Website</h3>
              <a href="https://digigreenntt.eu" target="_blank" rel="noopener noreferrer"
                 class="flex items-center gap-2 text-sm text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                digigreenntt.eu
              </a>
            </div>
            <div class="bg-white rounded-xl border border-[#E8E4DC] p-6">
              <h3 class="text-base font-semibold text-[#2D3436] mb-2">Project Coordinator</h3>
              <p class="text-sm text-[#5A6B5E]">TFC Research and Innovation Limited</p>
              <p class="text-xs text-[#7C9082] mt-1">Ireland</p>
            </div>
            <div class="bg-white rounded-xl border border-[#E8E4DC] p-6">
              <h3 class="text-base font-semibold text-[#2D3436] mb-4">Follow Us</h3>
              <div class="flex gap-3">
                <a href="https://twitter.com/digigreenntt" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-2 text-sm text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
                  Twitter
                </a>
                <a href="https://linkedin.com/company/digi-green-tt" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-2 text-sm text-[#7C9082] hover:text-[#5A6B5E] transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div class="mt-8 p-6 bg-[#F5F3EF] rounded-xl border border-[#E8E4DC]">
            <p class="text-xs text-gray-500 leading-relaxed">
              Funded by the European Union under Grant Agreement No. 101132546. Views and opinions expressed are
              however those of the author(s) only and do not necessarily reflect those of the European Union or
              the European Research Executive Agency.
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ContactComponent {}

