import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.page.html',
  styleUrls: ['./step-3.page.scss'],
})
export class Step3Page implements OnInit {
  form!: FormGroup;
  canShowError: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.passwordsMatchValidator() }
    );

    this.form.statusChanges.subscribe(() => {
      if (this.form.invalid && this.isAnyFieldEmpty()) {
        this.canShowError = false;
      }
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (controlName === 'confirmPassword' && this.form.hasError('mismatch')) {
      return 'Las contraseñas deben coincidir.';
    }
    return '';
  }

  isAnyFieldEmpty(): boolean {
    return !this.passwordControl.value && !this.confirmPasswordControl.value;
  }

  submit() {
    this.canShowError = true;
    if (this.form.valid) {
      console.log('Contraseña creada con éxito:', this.form.value.password);
      this.router.navigate(['/main/home']);
    }
  }

  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const group = control as FormGroup;
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    };
  }
}
