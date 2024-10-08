import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit, AfterViewInit {
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() autofocus: boolean = false;
  @Input() autocomplete!: string;
  @Input() icon!: string;
  @Input() labelPlacement: string | null = null;

  @ViewChild(IonInput, { static: false }) inputElement!: IonInput;

  isPassword!: boolean;
  hide: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.type === 'password') this.isPassword = true;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();

    if (this.autofocus && this.inputElement) {
      setTimeout(() => {
        this.inputElement
          .setFocus()
          .then(() => {
            console.log('Input enfocado');
          })
          .catch((err) => {
            console.error('Error al enfocar el input', err);
          });
      }, 300);
    }
  }

  showOrHide() {
    this.hide = !this.hide;

    if (this.hide) this.type = 'password';
    else this.type = 'text';
  }
}
