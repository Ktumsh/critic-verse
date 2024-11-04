import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password-answer',
  templateUrl: './forgot-password-answer.page.html',
  styleUrls: ['./forgot-password-answer.page.scss'],
})
export class ForgotPasswordAnswerPage implements OnInit {
  form = new FormGroup({
    securityAnswer: new FormControl('', [Validators.required]),
  });
  securityQuestion: string | null = null;
  noQuestion: string =
    'No has configurado una pregunta de seguridad, por favor, contacta con nuestro soporte 🏳️';
  canShowError: boolean = false;

  constructor(
    private userService: UserService,
    private registrationService: RegistrationService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const email = this.registrationService.getEmail();
    if (email) {
      const user = await this.userService.getUserQuestionByEmail(email);
      if (user) {
        this.securityQuestion = user.question;
      } else {
        console.error('Usuario no encontrado.');
      }
    }
  }

  async onSubmit() {
    this.canShowError = true;
    if (this.form.valid) {
      const answer = this.form.controls['securityAnswer'].value;
      const email = this.registrationService.getEmail();
      if (email && answer) {
        const isValidAnswer = await this.userService.verifySecurityAnswer(
          email,
          answer
        );
        if (isValidAnswer) {
          this.router.navigate([
            '/forgot-password/forgot-password-change-password',
          ]);
        } else {
          this.showToast(
            'Respuesta de seguridad incorrecta.',
            'alert-circle-outline'
          );
          console.error('Respuesta de seguridad incorrecta.');
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
