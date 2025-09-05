import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [
    RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }

  adminSet() {
    /* this.authForm.get('username')?.setValue('admin');
    this.authForm.get('password')?.setValue('admin@123'); */
  }
  teacherSet() {
    /* this.authForm.get('username')?.setValue('teacher');
    this.authForm.get('password')?.setValue('teacher@123'); */
  }
  studentSet() {
    /* this.authForm.get('username')?.setValue('student');
    this.authForm.get('password')?.setValue('student@123'); */
  }
  
 /*  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'Email and Password not valid !';
      this.loading = false;
      return;
    } 
      this.authService
        .signinUser(this.f['email'].value, this.f['password'].value)
        .subscribe({
          next: () => {
            const role = this.authService.currentUserValue.usertype_role
            console.log('ROLE', role);
            
            if (role === Role.Admin) {
              this.router.navigate(['/admin/home']);
              this.showSuccess();
            } else if (role === Role.PropertyManager) {
              this.router.navigate(['/property-dashboards/prop-dash']);
              this.showSuccess();
            } else if (role === Role.Resident) {
              this.router.navigate(['/residents-dashboard/res-dash']);
              this.showSuccess();
            } else if (role === Role.SoftwareDeveloper) {
              this.router.navigate(['/admin/dashboard']);
              this.showSuccess();
            } else if (role === Role.Staff) {
              this.router.navigate(['/staff-dashboards/staff-dash']);
              this.showSuccess();
            } else {
              this.router.navigate(['/authentication/signin']);
            }
            this.loading = false;
          },
          error: (error) => {
            this.error = error.message;
            this.showError();
            this.submitted = false;
            this.loading = false;
          },
        });
  } */
 onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'Email and Password not valid !';
      this.loading = false;
      return;
    }

    this.authService
      .signinUser(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: () => {
          const role = this.authService.currentUserValue.usertype_role;
          console.log('ROLE', role);

          if (role === Role.Admin) {
            this.router.navigate(['/admin/home']);
          } else if (role === Role.PropertyManager) {
            this.router.navigate(['/property-dashboards/prop-dash']);
          } else if (role === Role.Resident) {
            this.router.navigate(['/residents-dashboard/res-dash']);
          } else if (role === Role.SoftwareDeveloper) {
            this.router.navigate(['/admin/dashboard']);
          } else if (role === Role.Staff) {
            this.router.navigate(['/staff-dashboards/staff-dash']);
          } else {
            this.router.navigate(['/authentication/signin']);
          }
          this.showSuccess();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.showError();
          this.submitted = false;
          this.loading = false;
        },
      });
  }
  
  // ? Display Success?Failure Message
  showSuccess() {
    this.toastr.success('Login Successful');
  }

  showError() {
    this.toastr.error("Invalid Credentials: Check Your Email and Password");
  } 

}
