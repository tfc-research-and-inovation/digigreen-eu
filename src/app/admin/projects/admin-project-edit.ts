import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { AdminDataService } from '../admin-data.service';
import { toModel, toPatch } from '../form-utils';

const NULLABLE = ['website', 'logo_url', 'contact_name', 'contact_email', 'belongs_to_project'];
const ARRAYS = ['tags'];

@Component({
  selector: 'app-admin-project-edit',
  imports: [FormField, RouterLink],
  template: `
    <h1 class="text-2xl font-semibold text-[#2D3436] mb-6">{{ isNew ? 'New' : 'Edit' }} project</h1>

    <form (submit)="save($event)" class="bg-white rounded shadow p-6 space-y-4 max-w-3xl">
      <label class="block">
        <span class="text-sm text-gray-600">name</span>
        <input [formField]="f.name" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">description</span>
        <textarea [formField]="f.description" rows="5" class="mt-1 w-full border rounded px-3 py-2"></textarea>
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">website</span>
        <input [formField]="f.website" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">logo_url</span>
        <input [formField]="f.logo_url" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">status</span>
        <input [formField]="f.status" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">tags (comma separated)</span>
        <input [formField]="f.tags" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">contact_name</span>
        <input [formField]="f.contact_name" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">contact_email</span>
        <input [formField]="f.contact_email" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">belongs_to_project</span>
        <input [formField]="f.belongs_to_project" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">sort_order</span>
        <input type="number" [formField]="f.sort_order" class="mt-1 border rounded px-3 py-2" />
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" [formField]="f.is_featured" /> <span>is_featured</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" [formField]="f.featured_only" /> <span>featured_only</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" [formField]="f.is_coordinator" /> <span>is_coordinator</span>
      </label>

      @if (error()) {
        <p class="text-sm text-red-600"><i class="fa-solid fa-circle-exclamation mr-1"></i>{{ error() }}</p>
      }
      <div class="flex gap-3 pt-2">
        <button type="submit" class="px-4 py-2 rounded bg-[#2D3436] text-white hover:bg-[#7C9082]">
          <i class="fa-solid fa-floppy-disk mr-2"></i>Save
        </button>
        <a routerLink="/admin/projects" class="px-4 py-2 rounded border">Cancel</a>
      </div>
    </form>
  `,
})
export class AdminProjectEdit {
  private readonly admin = inject(AdminDataService);
  private readonly router = inject(Router);
  private readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  /** /admin/<section>/new creates a row instead of editing one. */
  protected readonly isNew = this.id === 'new';
  protected readonly error = signal('');

  protected readonly model = signal({
    name: '',
    description: '',
    website: '',
    logo_url: '',
    status: '',
    tags: '',
    contact_name: '',
    contact_email: '',
    belongs_to_project: '',
    sort_order: 0,
    is_featured: false,
    featured_only: false,
    is_coordinator: false,
  });
  protected readonly f = form(this.model);

  constructor() {
    if (this.isNew) return;
    this.admin.getById('projects', this.id).subscribe(row => this.model.set(toModel(row, this.model())));
  }

  save(event: Event) {
    event.preventDefault();
    this.error.set('');
    const row = toPatch(this.model(), NULLABLE, ARRAYS);
    const request = this.isNew ? this.admin.insert('projects', row) : this.admin.update('projects', this.id, row);
    request.subscribe({
      next: () => this.router.navigate(['/admin/projects']),
      error: (e: { message: string }) => this.error.set(e.message), // stay on the page
    });
  }
}
