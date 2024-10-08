import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { calculateDaysUntilBirthday } from 'src/utils/common';
import { dateValidator, minimumAgeValidator } from 'src/utils/validations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupPage implements OnInit {
  form = new FormGroup({
    birthday: new FormControl('', [
      Validators.required,
      dateValidator,
      minimumAgeValidator(13),
    ]),
  });

  canShowError: boolean = false;
  daysUntilBirthday: number | null = null;

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.form.controls.birthday.value === '') {
        this.canShowError = false;
      }
    });
  }

  submit() {
    this.canShowError = true;
    if (this.form.valid) {
      const birthdayValue = this.form.controls.birthday.value ?? '';
      const birthday = new Date(birthdayValue);

      this.registrationService.setBirthdate(birthday);
      this.router.navigate(['/signup/signup-username']);
    }
  }

  onDateChange(event: any) {
    const value = event.detail.value;
    if (value) {
      const birthday = new Date(value);
      this.daysUntilBirthday = calculateDaysUntilBirthday(birthday);
    }
  }
}
