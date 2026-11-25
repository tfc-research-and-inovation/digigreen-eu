import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AddButton } from '../shared/add-button';
import { AdminDataService, PAGE_SIZE } from '../admin-data.service';

@Component({
  selector: 'app-admin-projects',
  imports: [RouterLink, AddButton],
  template: `
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-[#2D3436]">Projects</h1>
      <app-add-button />
    </div>

    @if (data.hasValue()) {
      <table class="w-full bg-white rounded shadow text-sm">
        <thead class="text-left bg-gray-100">
          <tr>
            <th class="p-3">Name</th>
            <th class="p-3">Status</th>
            <th class="p-3">Belongs to project</th>
            <th class="p-3 w-28">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (row of data.value().rows; track row.id) {
            <tr class="border-t">
              <td class="p-3">{{ row.name }}</td>
              <td class="p-3">{{ row.status }}</td>
              <td class="p-3">{{ row.belongs_to_project }}</td>
              <td class="p-3 space-x-3">
                <a [routerLink]="[row.id]" title="Edit" class="text-[#2D3436] hover:text-[#7C9082]">
                  <i class="fa-solid fa-pen"></i>
                </a>
                <button type="button" title="Delete" class="text-red-600 hover:text-red-800">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>

      <div class="flex items-center gap-4 mt-4 text-sm">
        <button type="button" (click)="page.set(page() - 1)" [disabled]="page() === 0"
                class="px-3 py-1 border rounded bg-white disabled:opacity-40">
          <i class="fa-solid fa-chevron-left"></i> Prev
        </button>
        <span>Page {{ page() + 1 }} of {{ pages() }}</span>
        <button type="button" (click)="page.set(page() + 1)" [disabled]="page() + 1 >= pages()"
                class="px-3 py-1 border rounded bg-white disabled:opacity-40">
          Next <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    } @else if (data.error()) {
      <p class="text-red-600">Failed to load projects.</p>
    } @else {
      <p>Loading…</p>
    }
  `,
})
export class AdminProjects {
  private readonly admin = inject(AdminDataService);

  protected readonly page = signal(0);
  protected readonly data = rxResource({
    params: () => this.page(),
    stream: ({ params }) => this.admin.page('projects', params),
  });
  protected readonly pages = computed(() =>
    Math.max(1, Math.ceil((this.data.value()?.total ?? 0) / PAGE_SIZE)),
  );
}
