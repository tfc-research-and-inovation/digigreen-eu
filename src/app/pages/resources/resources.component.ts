import {Component, OnInit, inject, signal, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ResourcesService} from '../../services/resources.service';
import {Resource} from '../../models';
import {PageHeaderComponent} from '../../components/shared/page-header.component';
import {LoadingStateComponent} from '../../components/shared/loading-state.component';
import {EmptyStateComponent} from '../../components/shared/empty-state.component';

// const RESOURCE_TYPES = ['Deliverable', 'Publication', 'Better Practice Guide', 'Policy Brief', 'Data & DMP'];
const RESOURCE_TYPES = ['Deliverable', 'Publication', 'Better Practice Guide', 'Policy Brief'];
const TYPE_COLORS: Record<string, string> = {
  'Deliverable': 'bg-blue-100 text-blue-800',
  'Publication': 'bg-purple-100 text-purple-800',
  'Better Practice Guide': 'bg-green-100 text-green-800',
  'Policy Brief': 'bg-amber-100 text-amber-800',
  'Data & DMP': 'bg-cyan-100 text-cyan-800',
};

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [DatePipe, PageHeaderComponent, LoadingStateComponent, EmptyStateComponent],
  template: `
    <div>
      <app-page-header
        title="Resources"
        subtitle="Access individual project deliverables, publications, policy briefs, and better practice guides."
        breadcrumb="Resources"/>
      <section class="py-16 md:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <!-- Page actions -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 class="text-xl font-semibold text-[#2D3436]">Resources library</h2>
              <p class="text-sm text-[#5A6B5E] mt-1">
                Browse resources or submit a new PDF for review.
              </p>
            </div>
            <a href="" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#7C9082] hover:bg-[#6f8275] text-white rounded-lg text-sm font-medium transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Upload PDF
            </a>
          </div>

          <!-- Filter buttons -->
          <div class="flex gap-2 flex-wrap mb-8">
            <button (click)="selectedType.set('all')"
                    [class]="selectedType()==='all' ? 'bg-[#7C9082] text-white' : 'border border-[#E8E4DC] text-[#5A6B5E] hover:border-[#7C9082]'"
                    class="px-3 py-1.5 text-sm rounded-lg transition-colors">All Resources
            </button>
            @for (type of resourceTypes; track type) {
              <button (click)="selectedType.set(type)"
                      [class]="selectedType()===type ? 'bg-[#7C9082] text-white' : 'border border-[#E8E4DC] text-[#5A6B5E] hover:border-[#7C9082]'"
                      class="px-3 py-1.5 text-sm rounded-lg transition-colors">{{ type }}
              </button>
            }
          </div>
          @if (loading()) {
            <app-loading-state message="Loading resources…"/>
          } @else if (filtered().length === 0) {
            <app-empty-state title="No resources available yet"
                             message="Resources will be added as the project progresses."/>
          } @else {
            <div class="space-y-4">
              @for (r of filtered(); track r.id) {
                <div class="bg-white rounded-xl border border-[#E8E4DC] p-6 hover:shadow-md transition-shadow">
                  <div class="flex flex-col md:flex-row md:items-start gap-4">
                    <div class="shrink-0 w-12 h-12 rounded-lg bg-[#7C9082]/10 flex items-center justify-center">
                      <svg class="h-6 w-6 text-[#7C9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-wrap items-center gap-2 mb-2">
                        <span [class]="typeColor(r.resource_type)" class="px-2 py-0.5 text-xs rounded-full font-medium">
                          {{ r.resource_type }}
                        </span>
                        @if (r.deliverable_number) {
                          <span
                            class="px-2 py-0.5 text-xs border border-[#E8E4DC] rounded-full text-[#5A6B5E]">{{ r.deliverable_number }}</span>
                        }
                        @if (r.work_package) {
                          <span
                            class="px-2 py-0.5 text-xs border border-[#E8E4DC] rounded-full text-[#5A6B5E]">{{ r.work_package }}</span>
                        }
                      </div>
                      <h3 class="text-lg font-semibold text-[#2D3436] mb-2">{{ r.title }}</h3>
                      @if (r.description) {
                        <p class="text-sm text-[#5A6B5E] mb-3 line-clamp-2">{{ r.description }}</p>
                      }
                      <div class="flex flex-wrap items-center gap-4 text-xs text-[#7C9082]">
                        @if (r.publish_date) {
                          <span>Published: {{ r.publish_date | date:'mediumDate' }}</span>
                        }
                        @if (r.authors) {
                          <span>Authors: {{ r.authors }}</span>
                        }
                      </div>
                    </div>
                    @if (r.file_url) {
                      <div class="shrink-0">
                        <a [href]="r.file_url" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F3EF] hover:bg-[#E8E4DC] text-[#5A6B5E] rounded-lg text-sm font-medium transition-colors">
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                          View
                        </a>
                      </div>
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
export class ResourcesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ResourcesService);

  all = signal<Resource[]>([]);
  loading = signal(true);
  selectedType = signal('all');
  readonly resourceTypes = RESOURCE_TYPES;

  filtered = computed(() => {
    const t = this.selectedType();
    return t === 'all' ? this.all() : this.all().filter(r => r.resource_type === t);
  });

  typeColor(type: string): string {
    return TYPE_COLORS[type] ?? 'bg-gray-100 text-gray-800';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const type = params['type'];
      if (type && RESOURCE_TYPES.includes(type)) this.selectedType.set(type);
    });
    this.service.getAll().subscribe(data => {
      this.all.set(data);
      this.loading.set(false);
    });
  }
}

