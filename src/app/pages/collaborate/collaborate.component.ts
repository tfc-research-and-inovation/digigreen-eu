import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '../../components/shared/page-header.component';
import { JointActivityFormComponent } from '../../components/collaborate/joint-activity-form.component';
import { NetworkFormComponent } from '../../components/collaborate/network-form.component';

@Component({
  selector: 'app-collaborate',
  standalone: true,
  imports: [PageHeaderComponent, JointActivityFormComponent, NetworkFormComponent],
  template: `
    <div>
      <app-page-header
        title="Collaborate With Us"
        subtitle="Join the DigiGreenTT Sister project network or propose a joint activity to advance fair twin transitions across Europe."
        breadcrumb="Collaborate"/>
      <section class="py-16 md:py-24">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Tab switcher -->
          <div class="grid grid-cols-2 gap-1 bg-[#F5F3EF] p-1 rounded-xl mb-8">
            <button (click)="activeTab.set('activity')"
              [class]="activeTab()==='activity' ? 'bg-white shadow-sm text-[#2D3436]' : 'text-[#5A6B5E] hover:text-[#2D3436]'"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <span class="hidden sm:inline">Propose a Joint Activity</span>
              <span class="sm:hidden">Joint Activity</span>
            </button>
            <button (click)="activeTab.set('network')"
              [class]="activeTab()==='network' ? 'bg-white shadow-sm text-[#2D3436]' : 'text-[#5A6B5E] hover:text-[#2D3436]'"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="hidden sm:inline">Join the Network</span>
              <span class="sm:hidden">Join Network</span>
            </button>
          </div>

          @if (activeTab() === 'activity') {
            <div class="bg-white rounded-xl border border-[#E8E4DC] p-6 md:p-8">
              <div class="mb-8">
                <h2 class="text-xl font-semibold text-[#2D3436] mb-3">Propose a Joint Activity</h2>
                <p class="text-[#5A6B5E]">Have an idea for a joint workshop, publication, or event? Share your proposal and we'll explore how FITTER-EU and our sister projects can collaborate.</p>
              </div>
              <app-joint-activity-form/>
            </div>
          }

          @if (activeTab() === 'network') {
            <div class="bg-white rounded-xl border border-[#E8E4DC] p-6 md:p-8">
              <div class="mb-8">
                <h2 class="text-xl font-semibold text-[#2D3436] mb-3">Join the Group Sister Project Network</h2>
                <p class="text-[#5A6B5E]">Connect your Horizon Europe project with FITTER-EU and other projects working on fair, inclusive green and digital transitions.</p>
              </div>
              <app-network-form/>
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class CollaborateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  activeTab = signal<'activity' | 'network'>('activity');

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      if (tab === 'network' || tab === 'activity') this.activeTab.set(tab);
    });
  }
}

