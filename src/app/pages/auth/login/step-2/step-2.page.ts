import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.mode';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
})
export class Step2Page implements OnInit {
  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  canShowError: boolean = false;
  user: User | undefined;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.user = navigation.extras.state['user'] as User;
    }

    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.form.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.form.controls.password.value === '') {
        this.canShowError = false;
      }
    });
  }

  submit() {
    this.canShowError = true;
    if (this.form.controls.password.valid) {
      const password = this.form.controls.password.value;
      if (this.user && this.user.password === password) {
        this.canShowError = false;
        this.router.navigate(['/main/home']);
      } else {
        console.error('Contraseña incorrecta');
        this.form.controls.password.setErrors({ incorrect: true });
      }
    }
  }
}
