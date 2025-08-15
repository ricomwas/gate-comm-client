import { Component, EventEmitter, Output, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
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
  selector: 'app-property-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
    ],
  templateUrl: './property-signup.component.html',
  styleUrls: ['./property-signup.component.scss']
})
export class PropertySignupComponent implements OnInit, AfterViewInit {

  @Output() formSubmitted = new EventEmitter<void>();

  // Strongly typed form group
  propertyRegForm!: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    phone_number: FormControl<string>;
    property_location: FormControl<string>;
    password: FormControl<string>;
    confirm_password: FormControl<string>;
  }>;

  submitted = false;
  passwordInvalid = false;
  confirmPasswordInvalid = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<PropertySignupComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.propertyRegForm = this.fb.group({
      name: this.fb.control('', {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email]
      }),
      phone_number: this.fb.control('', {
        validators: [Validators.required]
      }),
      property_location: this.fb.control('', {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]
      }),
      password: this.fb.control('', {
        validators: [
          Validators.minLength(8),
          Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
        ]
      }),
      confirm_password: this.fb.control('', {
        validators: [Validators.required]
      })
    },
    { validators: MustMatch('password', 'confirm_password') }
    );
  }

  get pf() {
    return this.propertyRegForm.controls;
  }

  ngAfterViewInit() {
    this.updateValidityStates();
    this.cdr.detectChanges();
  }

  private updateValidityStates() {
    this.passwordInvalid = this.propertyRegForm.controls.password.invalid;
    this.confirmPasswordInvalid = this.propertyRegForm.controls.confirm_password.invalid;
  }

  onSubmit() {
    this.submitted = true;
    this.updateValidityStates();

    if (this.propertyRegForm.invalid) return;

    const payload = {
      ...this.propertyRegForm.getRawValue(),
      createdby: 100,
      updatedby: 100
    };
    console.log('Reg Payload', payload);
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
