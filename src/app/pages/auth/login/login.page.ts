import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { USER_MODEL } from 'src/app/models/user.mode';

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

  constructor(private router: Router) {}

  // Aquí se controla el error de correo electrónico cuando el campo este vacío
  ngOnInit() {
    this.form.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.form.controls.email.value === '') {
        this.canShowError = false;
      }
    });
  }

  submit() {
    this.canShowError = true;
    if (this.form.controls.email.valid) {
      const email = this.form.controls.email.value ?? '';
      const user = USER_MODEL.find((user) => user.email === email);

      console.log('user', USER_MODEL);

      let navigationExtras: NavigationExtras = {
        state: {
          user: user,
        },
      };

      if (user) {
        this.canShowError = false;
        this.router.navigate(['/login/step-2'], navigationExtras);
      } else {
        this.router.navigate(['/signup', navigationExtras]);
      }
    } else {
      console.error('Correo electrónico no válido');
    }
  }
}
