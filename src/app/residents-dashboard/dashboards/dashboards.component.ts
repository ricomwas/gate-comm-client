import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component'

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent implements OnInit{
  breadscrums = [
    {
      title: 'List Users',
      items: ['Active Users'],
      active: '',
    },
  ];

  currUser: any;


  ngOnInit(): void {
    const stored = localStorage.getItem('curr_user');
    if (stored) {
      this.currUser = JSON.parse(stored);
      // console.log('Curr User:', this.currUser);
    }
  }

}
