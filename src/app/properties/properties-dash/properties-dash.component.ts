import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-properties-dash',
  imports: [BreadcrumbComponent],
  templateUrl: './properties-dash.component.html',
  styleUrl: './properties-dash.component.scss'
})
export class PropertiesDashComponent {

  breadscrums = [
    {
      title: 'Summary Dashboard',
      items: ['Property Manager'],
      active: 'Summary Dashboard',
    },
  ];

}
