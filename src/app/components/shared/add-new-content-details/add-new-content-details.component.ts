import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import {
  GAME_GENRES,
  MOVIE_GENRES,
  PLATFORM_OPTIONS,
  STREAMING_OPTIONS,
  TVSHOW_GENRES,
} from 'src/app/models/content.model';
import { Detail } from 'src/app/types/detail';
import { adjustDate } from 'src/utils/common';
import { errorMessage } from 'src/utils/validations';

@Component({
  selector: 'app-add-new-content-details',
  templateUrl: './add-new-content-details.component.html',
  styleUrls: ['./add-new-content-details.component.scss'],
})
export class AddNewContentDetailsComponent implements OnInit {
  @Input() contentType!: string;
  @Input() basicContentData!: any;
  @Input() isEditMode: boolean = false;
  @Input() existingDetail: Detail | null = null;

  form!: FormGroup;
  canShowError: boolean = false;

  customAlertOptions = {
    cssClass: 'custom-alert-select',
  };

  genreOptions: string[] = [];
  platformOptions: string[] = PLATFORM_OPTIONS;
  streamingOptions: string[] = STREAMING_OPTIONS;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {
    this.initializeFormControls();
  }

  ngOnInit() {
    this.initializeGenreOptions();

    if (this.existingDetail) {
      this.populateFormWithExistingDetail();
    } else {
      if (this.contentType === 'tvshow') {
        this.addSeason();
      }
    }

    this.setFormValidators();
  }

  private initializeFormControls() {
    this.form = this.fb.group({
      releaseDate: ['', [Validators.required]],
      genre: [[], [Validators.required]],
      platforms: [[]],
      editor: [''],
      developer: [''],
      director: [''],
      producer: [''],
      writer: [''],
      productionCompany: [''],
      timeDuration: [''],
      episodeDuration: [''],
      streamingPlatform: [[]],
      episodesPerSeason: this.fb.array([]),
    });
  }

  private initializeGenreOptions() {
    if (this.contentType === 'game') {
      this.genreOptions = GAME_GENRES;
    } else if (this.contentType === 'movie') {
      this.genreOptions = MOVIE_GENRES;
    } else if (this.contentType === 'tvshow') {
      this.genreOptions = TVSHOW_GENRES;
    }
  }

  private populateFormWithExistingDetail() {
    console.log('Existing Detail:', this.existingDetail);

    const formattedDate = adjustDate(this.existingDetail?.releaseDate || '');

    this.form.patchValue({
      releaseDate: formattedDate,
      genre: this.existingDetail?.genre || [],
    });

    if (this.contentType === 'game') {
      this.form.patchValue({
        platforms: this.existingDetail?.platforms || [],
        editor: this.existingDetail?.editor || '',
        developer: this.existingDetail?.developer || '',
      });
    } else if (this.contentType === 'movie' || this.contentType === 'tvshow') {
      this.form.patchValue({
        director: this.joinArrayField(this.existingDetail?.director),
        producer: this.joinArrayField(this.existingDetail?.producer),
        writer: this.joinArrayField(this.existingDetail?.writer),
      });
    }

    if (this.contentType === 'movie') {
      this.form.patchValue({
        productionCompany: this.existingDetail?.productionCompany || '',
        timeDuration: this.existingDetail?.timeDuration || '',
      });
    } else if (this.contentType === 'tvshow') {
      this.form.patchValue({
        episodeDuration: this.existingDetail?.episodeDuration || '',
        streamingPlatform: this.existingDetail?.streamingPlatform || [],
      });

      if (this.existingDetail?.episodesPerSeason?.length) {
        this.existingDetail.episodesPerSeason.forEach((eps) => {
          const seasonGroup = this.fb.group({
            season: [eps.season, Validators.required],
            episodes: [eps.episodes, [Validators.required, Validators.min(1)]],
          });
          this.episodesPerSeasonControls.push(seasonGroup);
        });
      } else {
        this.addSeason();
      }
    }
  }

  private setFormValidators() {
    if (this.contentType === 'game') {
      this.setValidatorsForControls(
        ['platforms', 'editor', 'developer'],
        [Validators.required]
      );
    } else if (this.contentType === 'movie') {
      this.setValidatorsForControls(
        ['director', 'producer', 'writer', 'productionCompany', 'timeDuration'],
        [Validators.required]
      );
    } else if (this.contentType === 'tvshow') {
      this.setValidatorsForControls(
        [
          'director',
          'producer',
          'writer',
          'streamingPlatform',
          'episodeDuration',
        ],
        [Validators.required]
      );
      this.form.setValidators([this.atLeastOneSeasonValidator()]);
    }
  }

  private atLeastOneSeasonValidator(): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      if (control instanceof FormGroup) {
        const formGroup = control as FormGroup;
        const episodesPerSeason = formGroup.get(
          'episodesPerSeason'
        ) as FormArray;
        return episodesPerSeason && episodesPerSeason.length > 0
          ? null
          : { noSeason: true };
      } else {
        return null;
      }
    };
  }

  private joinArrayField(field: any): string {
    return Array.isArray(field) ? field.join(', ') : field || '';
  }

  private setValidatorsForControls(controlNames: string[], validators: any[]) {
    controlNames.forEach((name) => {
      this.getFormControl(name).setValidators(validators);
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }

  isAnyFieldEmpty(): boolean {
    return this.form.invalid;
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

    try {
      const detail: Detail = {
        releaseDate: this.form.get('releaseDate')!.value,
        genre: this.form.get('genre')!.value,
      };

      if (this.contentType === 'game') {
        detail.platforms = this.form.get('platforms')!.value;
        detail.editor = this.form.get('editor')!.value;
        detail.developer = this.form.get('developer')!.value;
      } else if (
        this.contentType === 'movie' ||
        this.contentType === 'tvshow'
      ) {
        detail.director = this.form
          .get('director')!
          .value.split(',')
          .map((d: string) => d.trim());
        detail.producer = this.form
          .get('producer')!
          .value.split(',')
          .map((p: string) => p.trim());
        detail.writer = this.form
          .get('writer')!
          .value.split(',')
          .map((w: string) => w.trim());
      }

      if (this.contentType === 'movie') {
        detail.productionCompany = this.form.get('productionCompany')!.value;
        detail.timeDuration = this.form.get('timeDuration')!.value;
      } else if (this.contentType === 'tvshow') {
        detail.seasons = this.episodesPerSeasonControls.length;
        detail.episodesPerSeason = this.episodesPerSeasonControls.controls.map(
          (ctrl) => ({
            season: ctrl.get('season')!.value,
            episodes: ctrl.get('episodes')!.value,
          })
        );
        detail.episodeDuration = this.form.get('episodeDuration')!.value;
        detail.streamingPlatform = this.form.get('streamingPlatform')!.value;
      }

      const finalContent = {
        ...this.basicContentData,
        detail: detail,
        _type: this.contentType.toLowerCase(),
      };

      this.modalController.dismiss({ content: finalContent });
    } catch (error) {
      console.error('Error al procesar los detalles del contenido:', error);
      await this.presentToast(
        'Ocurrió un error al procesar los detalles.',
        'alert-circle-outline'
      );
    }
  }

  get episodesPerSeasonControls() {
    return this.form.get('episodesPerSeason') as FormArray;
  }

  addSeason() {
    const seasonGroup = this.fb.group({
      season: [this.episodesPerSeasonControls.length + 1, Validators.required],
      episodes: ['', [Validators.required, Validators.min(1)]],
    });
    this.episodesPerSeasonControls.push(seasonGroup);
  }

  removeSeason(index: number) {
    if (this.episodesPerSeasonControls.length > 1 && index > 0) {
      this.episodesPerSeasonControls.removeAt(index);
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
}
