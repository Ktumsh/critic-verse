import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SECURTIRY_QUESTIONS } from 'src/app/models/security-questions.model';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password-answer',
  templateUrl: './forgot-password-answer.page.html',
  styleUrls: ['./forgot-password-answer.page.scss'],
})
export class ForgotPasswordAnswerPage {
  form = new FormGroup({
    securityQuestion: new FormControl('', [Validators.required]),
    securityAnswer: new FormControl('', [Validators.required]),
  });
  questions = SECURTIRY_QUESTIONS;

  canShowError: boolean = false;

  customAlertOptions = {
    cssClass: 'custom-alert-select',
  };

  constructor(
    private userService: UserService,
    private registrationService: RegistrationService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onSubmit() {
    this.canShowError = true;
    if (this.form.valid) {
      const question = this.form.controls['securityQuestion'].value;
      const answer = this.form.controls['securityAnswer'].value;
      const email = this.registrationService.getEmail();
      if (email && question && answer) {
        const isValid = await this.userService.verifySecurityQuestionAndAnswer(
          email,
          question,
          answer
        );
        if (isValid) {
          this.router.navigate([
            '/forgot-password/forgot-password-change-password',
          ]);
        } else {
          this.showToast(
            'Pregunta o respuesta de seguridad incorrecta.',
            'alert-circle-outline'
          );
          console.error('Pregunta o respuesta de seguridad incorrecta.');
        }
      }
    }
  }

  async showToast(message: string, icon?: string) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      icon,
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }
}
