import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-24 gap-4">
      <div class="w-8 h-8 border-4 border-[#E8E4DC] border-t-[#7C9082] rounded-full animate-spin"></div>
      <p class="text-sm text-[#7C9082]">{{ message }}</p>
    </div>
  `,
})
export class LoadingStateComponent {
  @Input() message = 'Loading…';
}

