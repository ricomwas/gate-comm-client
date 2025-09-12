import { Component, OnInit } from '@angular/core';
import { CustomService } from '@shared/services/custom.service';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [BreadcrumbComponent, JsonPipe],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {

  breadscrums = [
    {
      title: 'List Users',
      items: ['Active Users'],
      active: '',
    },
  ];

  users_props: any[] = [];
  loading = true;
  currUser: any;


  constructor(
    private custService: CustomService
  ){}

  ngOnInit(): void {
    const stored = localStorage.getItem('curr_user');
    if (stored) {
      this.currUser = JSON.parse(stored);
      console.log('Curr User:', this.currUser);
      console.log('CommID', this.currUser.comm_id);
      
    }
    this.getUserProp();
  }

  getUserProp() {
  const propID = this.currUser.comm_id
  
  this.custService.getUserByProperty(propID).subscribe({
    next: (data: any) => {
      this.users_props = data;
      console.log('UserProp Data', this.users_props);
      
      this.loading =false
    },
    error: (err) => {
      console.log('Error fetching the User Props', err);
      
    }
  })
  }

  


}
