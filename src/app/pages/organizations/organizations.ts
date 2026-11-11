import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Organization } from '../../models';
import { PageHeaderComponent } from '../../components/shared/page-header.component';
import { LoadingStateComponent } from '../../components/shared/loading-state.component';
import { EmptyStateComponent } from '../../components/shared/empty-state.component';

@Component({
  selector: 'app-organizations',
  imports: [PageHeaderComponent, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './organizations.html',
  styleUrl: './organizations.scss',
})
export class Organizations {
  protected readonly organizations = httpResource<Organization[]>(
    () => '/data/organizations.json',
    {
      parse: (raw) =>
        (raw as Organization[])
          .filter((o) => o.is_published)
          .sort((a, b) => a.order - b.order),
      defaultValue: [],
    },
  );
}
