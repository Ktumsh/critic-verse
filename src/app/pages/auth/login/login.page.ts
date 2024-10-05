import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  canShowError: boolean = false;

  constructor(
    private dbService: DbService,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  // Aquí se controla el error de correo electrónico cuando el campo este vacío
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
      const emailExists = await this.dbService.emailExists(email);

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
