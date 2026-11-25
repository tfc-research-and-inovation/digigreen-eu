import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { AdminDataService } from '../admin-data.service';
import { toModel, toPatch } from '../form-utils';

const NULLABLE = ['description', 'publish_date', 'authors', 'work_package', 'deliverable_number', 'belongs_to_project'];

@Component({
  selector: 'app-admin-resource-edit',
  imports: [FormField, RouterLink],
  template: `
    <h1 class="text-2xl font-semibold text-[#2D3436] mb-6">Edit resource</h1>

    <form (submit)="save($event)" class="bg-white rounded shadow p-6 space-y-4 max-w-3xl">
      <label class="block">
        <span class="text-sm text-gray-600">title</span>
        <input [formField]="f.title" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">resource_type</span>
        <input [formField]="f.resource_type" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">description</span>
        <textarea [formField]="f.description" rows="5" class="mt-1 w-full border rounded px-3 py-2"></textarea>
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">file_url</span>
        <input [formField]="f.file_url" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">publish_date</span>
        <input type="date" [formField]="f.publish_date" class="mt-1 border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">authors</span>
        <input [formField]="f.authors" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">work_package</span>
        <input [formField]="f.work_package" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">deliverable_number</span>
        <input [formField]="f.deliverable_number" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">belongs_to_project</span>
        <input [formField]="f.belongs_to_project" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" [formField]="f.is_published" /> <span>is_published</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" [formField]="f.hide_publish_day" /> <span>hide_publish_day</span>
      </label>

      <div class="flex gap-3 pt-2">
        <button type="submit" class="px-4 py-2 rounded bg-[#2D3436] text-white hover:bg-[#7C9082]">
          <i class="fa-solid fa-floppy-disk mr-2"></i>Save
        </button>
        <a routerLink="/admin/resources" class="px-4 py-2 rounded border">Cancel</a>
      </div>
    </form>
  `,
})
export class AdminResourceEdit {
  private readonly admin = inject(AdminDataService);
  private readonly router = inject(Router);
  private readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;

  protected readonly model = signal({
    title: '',
    resource_type: '',
    description: '',
    file_url: '',
    publish_date: '',
    authors: '',
    work_package: '',
    deliverable_number: '',
    belongs_to_project: '',
    is_published: false,
    hide_publish_day: false,
  });
  protected readonly f = form(this.model);

  constructor() {
    this.admin.getById('resources', this.id).subscribe(row => this.model.set(toModel(row, this.model())));
  }

  save(event: Event) {
    event.preventDefault();
    this.admin.update('resources', this.id, toPatch(this.model(), NULLABLE)).subscribe({
      next: () => this.router.navigate(['/admin/resources']),
      error: () => {}, // already logged by AdminDataService; stay on the page
    });
  }
}
