import { Component, OnInit, inject, signal } from '@angular/core';
import { PartnersService } from '../../services/partners.service';
import { Partner } from '../../models';
import { PageHeaderComponent } from '../../components/shared/page-header.component';
import { PartnerCardComponent } from '../../components/members/partner-card.component';
import { LoadingStateComponent } from '../../components/shared/loading-state.component';
import { EmptyStateComponent } from '../../components/shared/empty-state.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [PageHeaderComponent, PartnerCardComponent, LoadingStateComponent, EmptyStateComponent],
  template: `
    <div>
      <app-page-header
        title="Consortium Members"
        subtitle="Digi Green TT Horizon Europe Consortium – Grant Agreement No. 101132546"
        breadcrumb="Members"/>

      <section class="py-16 md:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          @if (loading()) {
            <app-loading-state message="Loading consortium registry…"/>
          } @else if (partners().length === 0) {
            <app-empty-state title="No consortium members" message="Consortium information is being updated."/>
          } @else {
            <div class="space-y-16">
              @if (coordinator()) {
                <div>
                  <h2 class="text-base font-semibold text-[#2D3436] uppercase tracking-wider mb-8 pb-3 border-b-2 border-[#7C9082]">
                    Project Coordinator
                  </h2>
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <app-partner-card [partner]="coordinator()!"/>
                  </div>
                </div>
              }
              @if (beneficiaries().length > 0) {
                <div>
                  <h2 class="text-base font-semibold text-[#2D3436] uppercase tracking-wider mb-8 pb-3 border-b-2 border-[#7C9082]">
                    Consortium Beneficiaries
                  </h2>
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    @for (p of beneficiaries(); track p.id) {
                      <app-partner-card [partner]="p"/>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class MembersComponent implements OnInit {
  private service = inject(PartnersService);

  partners = signal<Partner[]>([]);
  loading = signal(true);

  coordinator = () => this.partners().find(p => p.is_coordinator);
  beneficiaries = () => this.partners().filter(p => !p.is_coordinator);

  ngOnInit() {
    this.service.getAll().subscribe(data => {
      this.partners.set(data);
      this.loading.set(false);
    });
  }
}

