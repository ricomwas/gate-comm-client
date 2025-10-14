import { Component, OnInit } from '@angular/core';
import { CustomService } from '@shared/services/custom.service';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component'
import { JsonPipe } from '@angular/common';
import { ImportsModule } from '../../imports';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [BreadcrumbComponent, ImportsModule],
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
  users_temp_pass: any[] = [];
  loading = true;
  currUser: any;

  first = 0;

  rows = 10;


  constructor(
    private custService: CustomService
  ){}

  ngOnInit(): void {
    const stored = localStorage.getItem('curr_user');
    if (stored) {
      this.currUser = JSON.parse(stored);
      // console.log('Curr User:', this.currUser);
      // console.log('CommID', this.currUser.comm_id);
      
    }
    this.getUserProp();
    this.getusersTempPass();
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

  getusersTempPass(){
    const propID = this.currUser.comm_id
    
    this.custService.getUserwithTempPass(propID).subscribe({
      next: (data: any) => {
        this.users_temp_pass = data;
        console.log('UserTemp Data', this.users_temp_pass);
        
        this.loading =false
      },
      error: (err) => {
        console.log('Error fetching the User Props', err);
        
      }
    })

  }

  next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.users_props ? this.first + this.rows >= this.users_props.length : true;
    }

    isFirstPage(): boolean {
        return this.users_props ? this.first === 0 : true;
    }

  


}
