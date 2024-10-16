import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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

export function errorUserMessage(
  fieldName: string,
  form: FormGroup,
  canShowError: boolean
): string {
  const control = form.get(fieldName);
  if (control?.hasError('required') && canShowError) {
    return 'Este campo es obligatorio.';
  }
  if (control?.hasError('minlength') && canShowError) {
    return fieldName === 'password'
      ? 'La contraseña debe tener al menos 8 caracteres.'
      : 'El valor es demasiado corto.';
  }
  if (control?.hasError('maxlength') && canShowError) {
    return 'El valor es demasiado largo.';
  }
  if (control?.hasError('pattern') && canShowError) {
    return 'El valor contiene caracteres no permitidos.';
  }
  if (control?.hasError('email') && canShowError) {
    return 'El formato del correo no es válido.';
  }
  if (control?.hasError('invalidDomain') && canShowError) {
    return 'El formato del correo no es válido.';
  }
  if (control?.hasError('emailExists') && canShowError) {
    return 'Este correo electrónico ya está registrado.';
  }
  if (control?.hasError('usernameTaken') && canShowError) {
    return 'El nombre de usuario ya está en uso.';
  }
  if (control?.hasError('underage') && canShowError) {
    return 'El usuario debe tener al menos 13 años.';
  }
  if (control?.hasError('uppercase') && canShowError) {
    return 'La contraseña debe contener al menos una letra mayúscula.';
  }
  if (control?.hasError('lowercase') && canShowError) {
    return 'La contraseña debe contener al menos una letra minúscula.';
  }
  if (control?.hasError('number') && canShowError) {
    return 'La contraseña debe contener al menos un número.';
  }
  if (control?.hasError('specialCharacter') && canShowError) {
    return 'La contraseña debe contener al menos un carácter especial.';
  }
  return '';
}

export function emailDomainValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email: string = control.value || '';
  const domainPattern = /@[\w-]+\.[a-z]{2,}$/i;

  if (email && !domainPattern.test(email)) {
    return { invalidDomain: true };
  }
  return null;
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
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>\\/\[\];'=_+\-~`¡¿]/.test(
      control.value
    );
    return hasSpecialCharacter ? null : { specialCharacter: true };
  };
}

export function dateValidator(
  control: FormControl
): { [key: string]: boolean } | null {
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

export function minimumAgeValidator(
  minAge: number
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthdate = new Date(control.value);
    const today = new Date();

    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age < minAge ? { underage: true } : null;
  };
}
