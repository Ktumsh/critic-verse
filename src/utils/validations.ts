import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function errorMessage(form: FormGroup, controlName: string): string {
  const control = form.get(controlName);
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
  if (controlName === 'confirmPassword' && form.hasError('mismatch')) {
    return 'Las contraseñas deben coincidir.';
  }
  return '';
}

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };
}

export function newPasswordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const group = control as FormGroup;
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };
}

export function upperCaseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasUpperCase = /[A-Z]/.test(control.value);
    return hasUpperCase ? null : { uppercase: true };
  };
}

export function lowerCaseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasLowerCase = /[a-z]/.test(control.value);
    return hasLowerCase ? null : { lowercase: true };
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? null : { number: true };
  };
}

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    return hasSpecialCharacter ? null : { specialCharacter: true };
  };
}
