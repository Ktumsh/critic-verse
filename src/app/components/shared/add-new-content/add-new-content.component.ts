import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActionSheetController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/types/content';
import { Game } from 'src/app/types/game';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv';
import { errorMessage, oneDecimalValidator } from 'src/utils/validations';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AddNewContentDetailsComponent } from '../add-new-content-details/add-new-content-details.component';

@Component({
  selector: 'app-add-new-content',
  templateUrl: './add-new-content.component.html',
  styleUrls: ['./add-new-content.component.scss'],
})
export class AddNewContentComponent implements OnInit {
  @Input() content?: Content;
  form: FormGroup;
  isEditMode: boolean = false;
  canShowError: boolean = false;
  inputValue: string = '';
  customPopoverOptions = {
    cssClass: 'custom-popover v2',
  };

  constructor(
    private modalController: ModalController,
    private contentService: ContentService,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1200),
      ]),
      image: new FormControl(''),
      rating: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
        oneDecimalValidator,
      ]),
      contentType: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit() {
    if (this.content) {
      this.isEditMode = true;
      const contentType = this.getContentType(this.content);

      if (contentType === 'game') {
        this.content = (await this.contentService.getGameByIdWithDetails(
          this.content.id
        )) as Game;
        console.log(this.content);
      } else if (contentType === 'movie') {
        this.content = (await this.contentService.getMovieByIdWithDetails(
          this.content.id
        )) as Movie;
      } else if (contentType === 'tvshow') {
        this.content = (await this.contentService.getTvShowByIdWithDetails(
          this.content.id
        )) as TvShow;
      }

      this.form.patchValue({
        title: this.content.title,
        description: this.content.description || '',
        image: this.content.image || '',
        rating: this.content.rating || 0,
        contentType: contentType,
      });
    }
  }
  getFormControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }

  isAnyFieldEmpty(): boolean {
    return (
      !this.form.get('title')?.value ||
      !this.form.get('description')?.value ||
      !this.form.get('rating')?.value ||
      !this.form.get('contentType')?.value
    );
  }

  private getContentType(content: Content): string {
    if (this.isGame(content)) return 'game';
    if (this.isMovie(content)) return 'movie';
    if (this.isTvShow(content)) return 'tvshow';

    return '';
  }

  async onSubmit() {
    this.canShowError = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      await this.presentToast(
        'Debes completar todos los campos y asegurarte de que sean válidos.',
        'alert-circle-outline'
      );
      return;
    }

    const basicContentData = {
      id: this.content?.id,
      title: this.form.get('title')!.value,
      description: this.form.get('description')!.value,
      image: this.form.get('image')!.value || null,
      rating: parseFloat(this.form.get('rating')!.value),
      reviews: this.content?.reviews || [],
    };

    const modal = await this.modalController.create({
      component: AddNewContentDetailsComponent,
      componentProps: {
        contentType: this.form.get('contentType')!.value,
        basicContentData,
        isEditMode: this.isEditMode,
        existingDetail: this.content?.detail || null,
      },
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.content) {
        try {
          const finalContent: Content = result.data.content;

          if (this.isEditMode) {
            await this.contentService.updateContent(finalContent);
            await this.presentToast(
              '¡Contenido actualizado exitosamente!',
              'checkmark-circle-outline'
            );
          } else {
            await this.contentService.addNewContent(finalContent);
            await this.presentToast(
              '¡Contenido agregado exitosamente!',
              'checkmark-circle-outline'
            );
          }

          this.modalController.dismiss({ content: finalContent });
        } catch (error) {
          console.error('Error en la operación de contenido:', error);
          await this.presentToast(
            'Ocurrió un error al procesar la solicitud.',
            'alert-circle-outline'
          );
        }
      }
    });

    await modal.present();
  }

  async presentImageOptions() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'custom-sheet',
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Elegir de la galería',
          handler: () => {
            this.selectPhoto();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async selectPhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });

    if (image && image.dataUrl) {
      this.form.get('image')?.setValue(image.dataUrl);
    } else {
      await this.presentToast(
        'No se pudo obtener la imagen.',
        'alert-circle-outline'
      );
    }
  }

  getErrorMessage(controlName: string): string {
    return errorMessage(this.form, controlName);
  }

  async presentToast(message: string, icon: string) {
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
    this.modalController.dismiss({ dismissed: true });
  }

  isGame(content: Content): content is Game {
    return ((content as any)._type || '').toLowerCase() === 'game';
  }

  isMovie(content: Content): content is Movie {
    return ((content as any)._type || '').toLowerCase() === 'movie';
  }

  isTvShow(content: Content): content is TvShow {
    return ((content as any)._type || '').toLowerCase() === 'tvshow';
  }

  onInputChange() {
    this.inputValue = this.form.get('description')?.value || '';
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }
}
