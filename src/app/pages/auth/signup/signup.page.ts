import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupPage implements OnInit {
  form = new FormGroup({
    birthday: new FormControl('', [Validators.required, this.dateValidator]),
  });

  canShowError: boolean = false;
  daysUntilBirthday: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.form.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.form.controls.birthday.value === '') {
        this.canShowError = false;
      }
    });
  }

  submit() {
    this.canShowError = true;
    if (this.form.controls.birthday.valid) {
      const birthdayValue = this.form.controls.birthday.value ?? '';

      const birthday = new Date(birthdayValue);
      const today = new Date();
      const age = this.calculateAge(birthday, today);

      if (age >= 13) {
        this.router.navigate(['/signup/step-2']);
      } else {
        console.error(
          'El usuario debe tener al menos 13 años para registrarse.'
        );
        this.form.controls.birthday.setErrors({ underage: true });
      }
    }
  }

  onDateChange(event: any) {
    const value = event.detail.value;
    if (value) {
      const birthday = new Date(value);
      this.daysUntilBirthday = this.calculateDaysUntilBirthday(birthday);
    }
  }

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const today = new Date();
    if (isNaN(date.getTime())) {
      return { invalidDate: true };
    }
    if (date >= today) {
      return { futureDate: true };
    }
    return null;
  }

  calculateAge(birthday: Date, today: Date): number {
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthday.getDate())
    ) {
      age--;
    }

    return age;
  }

  calculateDaysUntilBirthday(birthday: Date): number {
    const today = new Date();
    const nextBirthday = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate()
    );

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diff = nextBirthday.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
