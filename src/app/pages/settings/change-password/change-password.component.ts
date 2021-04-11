import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { PASSWORD_VALIDATORS } from 'src/app/utils/form-validators';
import { AmplifyService } from 'src/app/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent {
  isInvalidCredits = false;
  forgotPasswordForm = new FormGroup({
    oldPassword: new FormControl('', PASSWORD_VALIDATORS),
    newPassword: new FormControl('', PASSWORD_VALIDATORS),
  });

  get oldPassword(): AbstractControl | null {
    return this.forgotPasswordForm.get('oldPassword');
  }

  get newPassword(): AbstractControl | null {
    return this.forgotPasswordForm.get('newPassword');
  }

  constructor(private authService: AmplifyService) {}

  submit(): void {
    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.valid && this.oldPassword && this.newPassword) {
      const oldPassword = this.oldPassword.value;
      const newPassword = this.newPassword.value;

      this.authService
        .currentAuthenticatedUser()
        .pipe(switchMap((user) => this.authService.changePassword(user, oldPassword, newPassword)))
        .subscribe(
          (value) => {
            this.handleRequest(value);
          },
          (error) => {
            this.handleRequestError(error);
          }
        );
    } else {
      console.warn('From is invalid: ', this.forgotPasswordForm);
    }
  }

  private handleRequest(value: any): void {
    console.log('request value: ', value);
  }

  private handleRequestError(error: any): void {
    console.log('request error: ', error);
    this.isInvalidCredits = true;
    this.forgotPasswordForm.markAsUntouched();
    this.newPassword?.setValue('');
    this.oldPassword?.setValue('');
  }
}