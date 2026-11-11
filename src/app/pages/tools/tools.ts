import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Tool } from '../../models';
import { PageHeaderComponent } from '../../components/shared/page-header.component';
import { LoadingStateComponent } from '../../components/shared/loading-state.component';
import { EmptyStateComponent } from '../../components/shared/empty-state.component';

@Component({
  selector: 'app-tools',
  imports: [PageHeaderComponent, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './tools.html',
  styleUrl: './tools.scss',
})
export class Tools {
  protected readonly tools = httpResource<Tool[]>(() => '/data/tools.json', {
    parse: (raw) =>
      (raw as Tool[]).filter((tool) => tool.is_published).sort((a, b) => a.order - b.order),
    defaultValue: [],
  });
}
