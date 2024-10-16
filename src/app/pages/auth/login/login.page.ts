import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  PatternValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';
import { emailDomainValidator } from 'src/utils/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100),
      emailDomainValidator,
    ]),
  });

  canShowError: boolean = false;

  constructor(
    private userService: UserService,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.form.controls.email.value === '') {
        this.canShowError = false;
      }
    });
  }

  async submit() {
    this.canShowError = true;
    if (this.form.controls.email.valid) {
      const email = this.form.controls.email.value ?? '';
      const emailExists = await this.userService.emailExists(email);

      if (emailExists) {
        this.canShowError = false;
        this.registrationService.setEmail(email);
        this.router.navigate(['/login/login-password']);
      } else {
        this.registrationService.setEmail(email);
        this.router.navigate(['/signup']);
      }
    } else {
      console.error('Correo electrónico no válido');
    }
  }
}
