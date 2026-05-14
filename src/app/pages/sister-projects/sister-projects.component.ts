import { Component, OnInit, inject, signal } from '@angular/core';
import { SisterProjectsService } from '../../services/sister-projects.service';
import { SisterProject } from '../../models';
import { PageHeaderComponent } from '../../components/shared/page-header.component';
import { ProjectCardComponent } from '../../components/sister-projects/project-card.component';
import { LoadingStateComponent } from '../../components/shared/loading-state.component';
import { EmptyStateComponent } from '../../components/shared/empty-state.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sister-projects',
  standalone: true,
  imports: [PageHeaderComponent, ProjectCardComponent, LoadingStateComponent, EmptyStateComponent, RouterLink],
  template: `
    <div>
      <app-page-header
        title="Sister Projects"
        subtitle="Horizon Europe projects working alongside FITTER-EU on fair, inclusive green and digital transitions."
        breadcrumb="Sister Projects"/>
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          @if (loading()) {
            <app-loading-state message="Loading sister projects…"/>
          } @else if (projects().length === 0) {
            <app-empty-state title="No sister projects yet" message="Sister project information will be added soon."/>
          } @else {
            @if (featured().length > 0) {
              <div class="mb-12">
                <h2 class="text-base font-semibold text-[#2D3436] uppercase tracking-wider mb-6 pb-3 border-b-2 border-[#7C9082]">Featured Projects</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  @for (p of featured(); track p.id) { <app-project-card [project]="p"/> }
                </div>
              </div>
            }
            <div>
              <h2 class="text-base font-semibold text-[#2D3436] uppercase tracking-wider mb-6 pb-3 border-b-2 border-[#E8E4DC]">All Sister Projects</h2>
              <div class="flex gap-2 mb-6 flex-wrap">
                @for (s of statuses; track s) {
                  <button (click)="filterStatus.set(s)"
                    [class]="filterStatus()===s ? 'bg-[#7C9082] text-white' : 'border border-[#E8E4DC] text-[#5A6B5E] hover:border-[#7C9082]'"
                    class="px-3 py-1.5 text-sm rounded-lg transition-colors">{{ s }}</button>
                }
              </div>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (p of filteredProjects(); track p.id) { <app-project-card [project]="p"/> }
              </div>
            </div>
          }
        </div>
      </section>
      <section class="bg-[#F5F3EF] py-12 md:py-16">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-2xl font-semibold text-[#2D3436] mb-4">Join the Network</h2>
          <p class="text-[#5A6B5E] mb-6">Is your Horizon Europe project working on twin transitions? Connect with us.</p>
          <a routerLink="/Collaborate" [queryParams]="{tab:'network'}"
             class="inline-flex items-center gap-2 bg-[#7C9082] hover:bg-[#5A6B5E] text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Apply to Join
          </a>
        </div>
      </section>
    </div>
  `,
})
export class SisterProjectsComponent implements OnInit {
  private service = inject(SisterProjectsService);
  projects = signal<SisterProject[]>([]);
  loading = signal(true);
  filterStatus = signal('All');
  readonly statuses = ['All', 'Onboard', 'Collaborator'];
  featured = () => this.projects().filter(p => p.is_featured);
  filteredProjects = () => {
    const s = this.filterStatus();
    return this.projects().filter(p => (s === 'All' || p.status === s) && !p.featured_only);
  };
  ngOnInit() {
    this.service.getAll().subscribe(data => { this.projects.set(data); this.loading.set(false); });
  }
}

