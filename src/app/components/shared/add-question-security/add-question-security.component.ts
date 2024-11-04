import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-add-question-security',
  templateUrl: './add-question-security.component.html',
  styleUrls: ['./add-question-security.component.scss'],
})
export class AddQuestionSecurityComponent implements OnInit {
  @Input() user!: User;

  securityQuestion: string | null = null;

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
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const email = this.user.email;
    if (email) {
      const user = await this.userService.getUserQuestionByEmail(email);
      if (user) {
        this.securityQuestion = user.question;
        const securityAnswer = user.answer;

        this.form.controls['securityQuestion'].setValue(this.securityQuestion);
        this.form.controls['securityAnswer'].setValue(securityAnswer);
      } else {
        console.error('Usuario no encontrado.');
      }
    }
  }

  async submit() {
    if (this.form.valid) {
      const question = this.form.controls.securityQuestion.value;
      const answer = this.form.controls.securityAnswer.value;

      try {
        if (this.user && question && answer) {
          await this.userService.saveSecurityQuestion(
            this.user.id,
            question,
            answer
          );
          this.showToast(
            '¡Se ha guardado tu pregunta de seguridad!',
            'checkmark-circle-outline'
          );
          this.dismiss();
        }
      } catch (error) {
        this.showToast(
          'Hubo un error al guardar la pregunta de seguridad',
          'alert-circle-outline'
        );
        console.error('Error:', error);
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

  dismiss() {
    this.modalController.dismiss();
  }
}
