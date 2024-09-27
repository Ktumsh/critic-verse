import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup-password',
  templateUrl: './signup-password.page.html',
  styleUrls: ['./signup-password.page.scss'],
})
export class SignupPasswordPage implements OnInit {
  form!: FormGroup;
  canShowError: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          this.upperCaseValidator(),
          this.lowerCaseValidator(),
          this.numberValidator(),
          this.specialCharacterValidator(),
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
    if (control?.hasError('uppercase')) {
      return 'La contraseña debe contener al menos una letra mayúscula.';
    }
    if (control?.hasError('lowercase')) {
      return 'La contraseña debe contener al menos una letra minúscula.';
    }
    if (control?.hasError('number')) {
      return 'La contraseña debe contener al menos un número.';
    }
    if (control?.hasError('specialCharacter')) {
      return 'La contraseña debe contener al menos un carácter especial.';
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
    if (!this.form.valid) {
      this.showToast(
        'top',
        'Por favor, revisa los campos.',
        'alert-circle-outline'
      );
      return;
    }
    if (this.form.valid) {
      console.log('Contraseña creada con éxito:', this.form.value.password);
      this.showToast(
        'top',
        '¡Cuenta creada con éxito! ¡Bienvenido!',
        'checkmark-circle-outline'
      );
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

  upperCaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const hasUpperCase = /[A-Z]/.test(control.value);
      return hasUpperCase ? null : { uppercase: true };
    };
  }

  lowerCaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const hasLowerCase = /[a-z]/.test(control.value);
      return hasLowerCase ? null : { lowercase: true };
    };
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const hasNumber = /\d/.test(control.value);
      return hasNumber ? null : { number: true };
    };
  }

  specialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
      return hasSpecialCharacter ? null : { specialCharacter: true };
    };
  }

  async showToast(
    position: 'top' | 'middle' | 'bottom',
    message: string,
    icon?: string
  ) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      swipeGesture: 'vertical',
      icon,
      message,
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
}
