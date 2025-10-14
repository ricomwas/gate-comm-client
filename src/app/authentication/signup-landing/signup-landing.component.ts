import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PropertySignupComponent } from '../property-signup/property-signup.component';
import { ResidentSignupComponent } from '../resident-signup/resident-signup.component';


@Component({
  selector: 'app-signup-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signup-landing.component.html',
  styleUrl: './signup-landing.component.scss'
})
export class SignupLandingComponent {

  constructor(
    private dialog: MatDialog
  ) { }

  /**
   * Opens the appropriate signup dialog based on the provided signupType.
   * @param signupType - The type of signup form to open ('propertyManager' or 'resident').
   */
  openSignupForm(signupType: string): void {

    // Declare dialogRef with a specific union type to ensure type safety.
    let dialogRef: MatDialogRef<PropertySignupComponent | ResidentSignupComponent>;

    const dialogConfig = {
      maxWidth: '60vw',
      width: '60%',
      panelClass: 'full-screen-modal',
      disableClose: true
    };

    if (signupType === 'propertyManager') {
      dialogRef = this.dialog.open(PropertySignupComponent, dialogConfig);
    } else if (signupType === 'resident') {
      dialogRef = this.dialog.open(ResidentSignupComponent, dialogConfig);
    } else {
      // Add a return statement to prevent the rest of the code from running
      // if an invalid signupType is provided.
      console.error('Invalid signup type provided: ', signupType);
      return;
    }

    // Subscribe to the dialog's afterClosed observable.
    dialogRef.afterClosed().subscribe(() => {
      console.log('The signup form dialog was closed');
    });

    // Subscribe to the component's formSubmitted event to close the dialog.
    dialogRef.componentInstance.formSubmitted.subscribe(() => {
      dialogRef.close();
    });
  }

   goToLogin(){
    
  }

}
