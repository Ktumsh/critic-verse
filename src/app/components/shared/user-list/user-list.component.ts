import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';

import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/types/user';

import { UserService } from 'src/app/services/user.service';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { UserOptionsComponent } from '../user-options/user-options.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  // ======= Propiedades =======
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  authenticatedUserId: string | null = null;

  length = 0;
  pageSize = 7;
  pageIndex = 0;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  sortAscendingUsername = true;
  sortAscendingRole = true;

  searchControl: FormControl = new FormControl('');

  private subscription!: Subscription;

  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authenticatedUserId = this.authService.user.id ?? null;

    this.subscription = this.userService.users$.subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
      this.length = this.users.length;
      this.updatePaginatedUsers();
    });

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.filterUsers(searchTerm);
    });

    this.userService.getAllUsers();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // ======= Métodos de Filtrado =======
  filterUsers(searchTerm: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm)
    );
    this.length = this.filteredUsers.length;
    this.updatePaginatedUsers();
  }

  // ======= Métodos de Paginación =======
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedUsers();
  }

  private updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  // ======= Métodos de Ordenamiento =======
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

  // ======= Gestión de Usuarios =======
  async openUserOptions(event: MouseEvent, user: User) {
    if (user.id === this.authenticatedUserId) {
      return;
    }

    const popover = await this.popoverController.create({
      component: UserOptionsComponent,
      cssClass: 'custom-popover v2',
      event: event,
      translucent: true,
      componentProps: {
        user,
      },
    });

    popover.onWillDismiss().then((result) => {
      if (result.data) {
        switch (result.data.action) {
          case 'edit':
            this.editUser(user);
            break;
          case 'delete':
            this.confirmDeleteAlert(user.username);
            break;
        }
      }
    });

    await popover.present();
  }

  async addUser() {
    const modal = await this.modalController.create({
      component: AddNewUserComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.user) {
        await this.userService.getAllUsers();
      }
    });

    await modal.present();
  }

  async editUser(user: User) {
    const modal = await this.modalController.create({
      component: AddNewUserComponent,
      componentProps: { user },
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.user) {
        await this.userService.getAllUsers();
      }
    });

    await modal.present();
  }

  async deleteUser(username: string) {
    try {
      await this.userService.deleteUserByUsername(username);
      await this.userService.getAllUsers();
      this.presentToast(`Usuario ${username} eliminado`, 'checkmark-circle');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }

  async confirmDeleteAlert(username: string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'custom-alert v2',
      header: 'Confirmar eliminación',
      message: '¿Estás seguro que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.deleteUser(username);
          },
        },
      ],
    });

    await alert.present();
  }

  // ======= Utilidades =======
  async presentToast(message: string, icon: string) {
    const toast = await this.toastController.create({
      swipeGesture: 'vertical',
      cssClass: 'custom-toast',
      icon,
      message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }

  // ======= Manejo de Modal =======
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
