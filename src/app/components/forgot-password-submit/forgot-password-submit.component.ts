import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AmplifyService} from '../../services/amplify.service';
import {Router} from '@angular/router';
import {EMAIL_VALIDATORS, PASSWORD_VALIDATORS} from '../../utils/form-validators';

@Component({
  selector: 'app-forgot-password-submit',
  templateUrl: './forgot-password-submit.component.html',
  styleUrls: ['./forgot-password-submit.component.scss']
})
export class ForgotPasswordSubmitComponent implements OnInit {
  forgotPasswordSubmitForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', PASSWORD_VALIDATORS),
  });

  get email(): AbstractControl | null {
    return this.forgotPasswordSubmitForm.get('email');
  }

  get code(): AbstractControl | null {
    return this.forgotPasswordSubmitForm.get('code');
  }

  get password(): AbstractControl | null {
    return this.forgotPasswordSubmitForm.get('password');
  }

  constructor(private authService: AmplifyService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.forgotPasswordSubmitForm.markAllAsTouched();

    if (this.forgotPasswordSubmitForm.valid && this.email && this.code && this.password) {
      this.authService.forgotPasswordSubmit(this.email.value, this.code.value, this.password.value).subscribe(
        value => {
          this.handleRequest(value);
        },
        error => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ' + this.forgotPasswordSubmitForm);
    }
  }

  private handleRequest(value: any): void {
    console.log('request value: ' + value);
  }

  private handleRequestError(error: any): void {
    console.log('request error: ' + error);
  }
}