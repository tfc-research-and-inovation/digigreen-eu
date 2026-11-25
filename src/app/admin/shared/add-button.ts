import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** "Add" link styled as a button. `link` is relative to the current route (default: `new`). */
@Component({
  selector: 'app-add-button',
  imports: [RouterLink],
  template: `
    <a [routerLink]="link()" class="px-4 py-2 rounded bg-[#2D3436] text-white hover:bg-[#7C9082]">
      <i class="fa-solid fa-plus mr-2"></i>Add
    </a>
  `,
})
export class AddButton {
  readonly link = input('new');
}
