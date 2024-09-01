import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { USER_MODEL } from 'src/app/models/user.model';

import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/types/user';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users = USER_MODEL;
  paginatedUsers: User[] = [];

  length = this.users.length;
  pageSize = 7;
  pageIndex = 0;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  sortAscendingUsername = true;
  sortAscendingRole = true;

  _bottomSheet = inject(MatBottomSheet);

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.updatePaginatedUsers();
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  sortUsersBy(column: string) {
    if (column === 'username') {
      this.sortAscendingUsername = !this.sortAscendingUsername;
      this.users.sort((a, b) => {
        if (a.username < b.username) {
          return this.sortAscendingUsername ? -1 : 1;
        } else if (a.username > b.username) {
          return this.sortAscendingUsername ? 1 : -1;
        } else {
          return 0;
        }
      });
    } else if (column === 'role') {
      this.sortAscendingRole = !this.sortAscendingRole;
      this.users.sort((a, b) => {
        if (a.role < b.role) {
          return this.sortAscendingRole ? -1 : 1;
        } else if (a.role > b.role) {
          return this.sortAscendingRole ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    this.updatePaginatedUsers();
  }

  openUserOptions(user: User): void {
    this._bottomSheet.open(BottomSheetComponent, {
      data: {
        title: 'Usuario ' + '"' + user.username + '"',
        options: [
          {
            label: 'Editar',
          },
          {
            label: 'Eliminar',
            isDanger: true,
          },
        ],
      },
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
