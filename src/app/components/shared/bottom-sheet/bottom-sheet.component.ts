import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

interface BottomSheetOption {
  label: string;
  action?: () => void;
  isSuccess?: boolean;
  isWarning?: boolean;
  isDanger?: boolean;
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent implements OnInit {
  title!: string;
  options: BottomSheetOption[] = [];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.title = data.title;
    this.options = data.options;
  }

  ngOnInit() {}

  executeAction(event: MouseEvent, action?: () => void): void {
    event.preventDefault();
    if (action) {
      action();
    }
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  openLink(event: MouseEvent): void {
    event.preventDefault();
    this._bottomSheetRef.dismiss();
  }
}
