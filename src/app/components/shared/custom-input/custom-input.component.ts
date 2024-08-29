import {
  AfterViewInit,
  Component,
  ElementRef,
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
}) /* , AfterViewInit <-- Para el autofocus */
export class CustomInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() autofocus: boolean = false;
  @Input() autocomplete!: string;
  @Input() value!: string;
  @Input() icon!: string;

  // Declarar el elemento del input DESACTIVADO POR EL MOMENTO
  /*   @ViewChild(IonInput, { static: false }) inputElement!: IonInput; */

  isPassword!: boolean;
  hide: boolean = true;

  constructor() {}

  ngOnInit() {
    if (this.type === 'password') this.isPassword = true;
  }

  // Hacer autofocus DESACTIVADO POR EL MOMENTO
  /*   ngAfterViewInit() {
    if (this.autofocus) {
      setTimeout(() => {
        this.inputElement.setFocus();
      }, 100);
    }
  } */

  // Mostrar y ocultar contraseña
  showOrHide() {
    this.hide = !this.hide;

    if (this.hide) this.type = 'password';
    else this.type = 'text';
  }
}
