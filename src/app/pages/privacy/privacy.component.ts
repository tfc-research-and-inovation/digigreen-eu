import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/shared/page-header.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <div>
      <app-page-header title="Privacy & Cookies" subtitle="How we handle your data and use cookies." breadcrumb="Privacy"/>
      <section class="py-16 md:py-24">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#5A6B5E]">
          <div>
            <h2 class="text-xl font-semibold text-[#2D3436] mb-4">Data Controller</h2>
            <p>TFC Research and Innovation Limited, Ireland, is the data controller for this website, operated as part of the FITTER-EU project funded by the European Union (Grant Agreement No. 101132546).</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-[#2D3436] mb-4">Cookies</h2>
            <p>This website uses essential cookies only. These are necessary for the website to function and cannot be disabled. We do not use tracking or advertising cookies.</p>
            <p class="mt-3">Essential cookies we use:</p>
            <ul class="mt-2 space-y-2 list-disc list-inside">
              <li><strong>fitter-cookie-consent</strong> – records that you have accepted our cookie notice.</li>
            </ul>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-[#2D3436] mb-4">Contact Forms</h2>
            <p>Information submitted via the Collaborate page forms (Joint Activity Proposals and Network Applications) is collected solely for the purpose of facilitating collaboration. It is not shared with third parties and is retained only as long as necessary for the stated purpose.</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-[#2D3436] mb-4">Your Rights</h2>
            <p>Under GDPR you have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:contact@tfcengage.com" class="text-[#7C9082] hover:underline">contact&#64;tfcengage.com</a>.</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-[#2D3436] mb-4">EU Funding Disclaimer</h2>
            <p>Funded by the European Union under Grant Agreement No. 101132546. Views and opinions expressed are those of the author(s) only and do not necessarily reflect those of the European Union or the European Research Executive Agency.</p>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class PrivacyComponent {}

