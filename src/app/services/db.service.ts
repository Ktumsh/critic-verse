import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private database!: SQLiteObject;
  private isNative: boolean = false;
  private dbInitialized: Promise<void> | undefined;

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private tableService: TableService
  ) {
    this.init();
  }

  //Inicializar de la base de datos
  private init(): void {
    this.dbInitialized = new Promise<void>(async (resolve, reject) => {
      try {
        await this.platform.ready();
        this.isNative =
          this.platform.is('cordova') || this.platform.is('capacitor');

        if (this.isNative) {
          this.database = await this.sqlite.create({
            name: 'criticverse.db',
            location: 'default',
          });

          await this.tableService.createTables(this.database);
          resolve();
        } else {
          console.error(
            'La base de datos solo está disponible en entornos nativos.'
          );
          reject('Entorno no nativo');
        }
      } catch (error) {
        console.error(
          'Error durante la inicialización de la base de datos:',
          error
        );
        reject(error);
      }
    });
  }

  //Verifica si es nativo
  private async checkNative(): Promise<void> {
    if (!this.isNative) {
      throw new Error('Esta operación solo se admite en entorno nativo.');
    }
  }

  //Acceder a la bd en otros servicios
  async getDatabase(): Promise<SQLiteObject> {
    await this.dbInitialized;
    await this.checkNative();
    return this.database;
  }

  //Crear la bd y las tablas
  async createDatabase(): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();

    const tablesExist = await this.tableService.checkIfTablesExist(
      this.database
    );
    if (!tablesExist) {
      await this.tableService.createTables(this.database);
      console.log('Base de datos y tablas creadas exitosamente.');
    } else {
      console.log('Las tablas ya existen, no se requiere volver a crearlas.');
    }
  }

  //Limpiar/eliminar la bd
  async clearDatabase(): Promise<void> {
    await this.dbInitialized;
    await this.checkNative();
    await this.tableService.clearTables(this.database);
    console.log('Todas las tablas eliminadas exitosamente en SQLite.');
  }
}
