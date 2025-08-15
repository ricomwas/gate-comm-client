import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-create-residents',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './create-residents.component.html',
  styleUrl: './create-residents.component.scss'
})
export class CreateResidentsComponent {
    breadscrums = [
    {
      title: 'Resident Module',
      items: [''],
      active: '',
    },
  ];
}
