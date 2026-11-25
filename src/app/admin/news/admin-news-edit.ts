import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { AdminDataService } from '../admin-data.service';
import { toModel, toPatch } from '../form-utils';

const NULLABLE = ['content', 'image_url', 'image_alt'];
const ARRAYS = ['tags'];

@Component({
  selector: 'app-admin-news-edit',
  imports: [FormField, RouterLink],
  template: `
    <h1 class="text-2xl font-semibold text-[#2D3436] mb-6">Edit news</h1>

    <form (submit)="save($event)" class="bg-white rounded shadow p-6 space-y-4 max-w-3xl">
      <label class="block">
        <span class="text-sm text-gray-600">title</span>
        <input [formField]="f.title" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">excerpt</span>
        <textarea [formField]="f.excerpt" rows="3" class="mt-1 w-full border rounded px-3 py-2"></textarea>
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">content</span>
        <textarea [formField]="f.content" rows="12" class="mt-1 w-full border rounded px-3 py-2"></textarea>
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">image_url</span>
        <input [formField]="f.image_url" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">image_alt</span>
        <input [formField]="f.image_alt" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">publish_date</span>
        <input type="date" [formField]="f.publish_date" class="mt-1 border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="text-sm text-gray-600">tags (comma separated)</span>
        <input [formField]="f.tags" class="mt-1 w-full border rounded px-3 py-2" />
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" [formField]="f.is_archived" /> <span>is_archived</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" [formField]="f.is_published" /> <span>is_published</span>
      </label>

      <div class="flex gap-3 pt-2">
        <button type="submit" class="px-4 py-2 rounded bg-[#2D3436] text-white hover:bg-[#7C9082]">
          <i class="fa-solid fa-floppy-disk mr-2"></i>Save
        </button>
        <a routerLink="/admin/news" class="px-4 py-2 rounded border">Cancel</a>
      </div>
    </form>
  `,
})
export class AdminNewsEdit {
  private readonly admin = inject(AdminDataService);
  private readonly router = inject(Router);
  private readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;

  protected readonly model = signal({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    image_alt: '',
    publish_date: '',
    tags: '',
    is_archived: false,
    is_published: false,
  });
  protected readonly f = form(this.model);

  constructor() {
    this.admin.getById('news', this.id).subscribe(row => this.model.set(toModel(row, this.model())));
  }

  save(event: Event) {
    event.preventDefault();
    this.admin.update('news', this.id, toPatch(this.model(), NULLABLE, ARRAYS)).subscribe({
      next: () => this.router.navigate(['/admin/news']),
      error: () => {}, // already logged by AdminDataService; stay on the page
    });
  }
}
