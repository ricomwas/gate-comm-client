import { Component, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, NonNullableFormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MustMatch } from '../../shared/directives/must-match.validators';

@Component({
  selector: 'app-resident-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './resident-signup.component.html',
  styleUrl: './resident-signup.component.scss'
})
export class ResidentSignupComponent implements AfterViewInit {

  @Output() formSubmitted = new EventEmitter<void>();

  residentRegForm!: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    phone_number: FormControl<string>;
    hse_number: FormControl<string>;
    community_id: FormControl<string>;
    password: FormControl<string>;
    confirm_password: FormControl<string>;
  }>;

  regInfor: any;
  props: any;
  submitted = false;
  passwordInvalid = false;
  confirmPasswordInvalid = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ResidentSignupComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.regForm();
    // this.getProperties();
  }

  regForm() {
    this.residentRegForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]), 
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      phone_number: this.formBuilder.control('', Validators.required),
      hse_number: this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      community_id: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', [Validators.minLength(8), Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]),
      confirm_password: this.formBuilder.control('', Validators.required)
    },
    {
      validators: MustMatch('password', 'confirm_password')
    });
  }

  get rf() {
    return this.residentRegForm.controls;
  }

  ngAfterViewInit() {
    this.updateValidityStates();
    this.cdr.detectChanges(); 
  }

  private updateValidityStates() {
    this.passwordInvalid = this.residentRegForm.controls.password.invalid;
    this.confirmPasswordInvalid = this.residentRegForm.controls.confirm_password.invalid;
  }

  onSubmit() {
    this.submitted = true;
    this.updateValidityStates();
    const payload = {
      ...this.residentRegForm.getRawValue(),
      createdby: 100,
      updatedby: 100
    }
    console.log('Reg Payload', payload)
  }

  onClose(): void {
    this.dialogRef.close();
  }

  showSuccess() {
    this.toastr.success('Your Account has been created successfully');
  }

  showError() {
    this.toastr.error("Error during registration");
  } 
}
