import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-signup-security-question',
  templateUrl: './signup-security-question.page.html',
  styleUrls: ['./signup-security-question.page.scss'],
})
export class SignupSecurityQuestionPage {
  user!: User;

  form = new FormGroup({
    securityQuestion: new FormControl('', [Validators.required]),
    securityAnswer: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  questions = [
    '¿Cuál es el nombre de tu primera mascota?',
    '¿Cuál es tu comida favorita?',
    '¿Cuál es la ciudad donde naciste?',
  ];

  customAlertOptions = {
    cssClass: 'custom-alert-select',
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) {
    this.user = this.authService.user;
  }

  async openSelect() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una pregunta de seguridad',
      buttons: this.questions.map((question) => ({
        text: question,
        handler: () => {
          this.form.controls.securityQuestion.setValue(question);
        },
      })),
    });

    await actionSheet.present();
  }

  async submit() {
    try {
      if (!this.user) {
        this.showToast(
          'Hubo un error al guardar la pregunta de seguridad',
          'alert-circle-outline'
        );
        console.error('El usuario no está autenticado.');
        return;
      }

      if (this.form.valid) {
        const question = this.form.controls.securityQuestion.value;
        const answer = this.form.controls.securityAnswer.value;

        if (question && answer) {
          await this.userService.saveSecurityQuestion(
            this.user.id,
            question,
            answer
          );
          this.showToast(
            '¡Se ha guardado tu pregunta de seguridad!',
            'checkmark-circle-outline'
          );
          this.router.navigate(['/main']);
        } else {
          this.showToast(
            'La pregunta o respuesta no pueden ser vacías',
            'alert-circle-outline'
          );
          console.error('La pregunta o respuesta no deben ser null');
        }
      }
    } catch (error) {
      this.showToast(
        'Hubo un error al guardar la pregunta de seguridad',
        'alert-circle-outline'
      );
      console.error('Error al guardar la pregunta de seguridad:', error);
    }
  }

  async skip() {
    this.router.navigate(['/main']);
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
