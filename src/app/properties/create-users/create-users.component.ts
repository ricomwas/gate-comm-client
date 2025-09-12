import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component'

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.scss'
})


export class CreateUsersComponent implements OnInit {

  breadscrums = [
    {
      title: 'Create Users',
      items: ['New User'],
      active: '',
    },
  ];


  ngOnInit(): void {
    
  }

}
