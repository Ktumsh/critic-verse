import { Injectable } from '@angular/core';
import { generateUUID } from 'src/utils/common';
import { DbService } from './db.service';
import * as CryptoJS from 'crypto-js';
import { createAvatar } from '@dicebear/core';
import * as botttsNeutral from '@dicebear/bottts-neutral';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dbService: DbService) {}

  //Crear un nuevo usuario (para el registro)
  async createUser(user: {
    email: string;
    username: string;
    password: string;
    birthdate?: string | Date;
    profileImage?: string;
  }): Promise<void> {
    const database = await this.dbService.getDatabase();
    try {
      const userId = generateUUID();
      const role = 'user';
      const salt = generateUUID();
      const hashedPassword = this.hashPassword(user.password, salt);
      const formattedBirthdate = this.formatDate(user.birthdate);

      const avatar = createAvatar(botttsNeutral, {
        seed: user.username,
        backgroundType: ['gradientLinear', 'solid'],
      });

      const profileImage = avatar.toDataUri();

      const userInsert = `
          INSERT INTO Users (id, role, email, username, password, salt, birthdate, profileImage, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `;
      const userValues = [
        userId,
        role,
        user.email,
        user.username,
        hashedPassword,
        salt,
        formattedBirthdate,
        profileImage || null,
      ];

      await database.executeSql(userInsert, userValues);
      console.log(
        `Usuario con email "${user.email}" registrado correctamente.`
      );
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  //Insertar un nuevo usuario
  async insertUser(user: {
    role: string;
    email: string;
    username: string;
    password: string;
    birthdate?: string | Date;
    profileImage?: string;
  }): Promise<void> {
    const database = await this.dbService.getDatabase();
    const userId = generateUUID();
    const salt = generateUUID();
    const hashedPassword = this.hashPassword(user.password, salt);
    const formattedBirthdate = this.formatDate(user.birthdate);

    const userInsert = `
      INSERT INTO Users (id, role, email, username, password, salt, birthdate, profileImage, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `;
    const userValues = [
      userId,
      user.role,
      user.email,
      user.username,
      hashedPassword,
      salt,
      formattedBirthdate,
      user.profileImage || null,
    ];

    await database.executeSql(userInsert, userValues);
    console.log(`Usuario con email "${user.email}" insertado correctamente.`);
  }

  //Verifica si un usuario existe
  async verifyUser(email: string, password: string): Promise<boolean> {
    const database = await this.dbService.getDatabase();
    const query = `SELECT * FROM Users WHERE email = ?`;
    const result = await database.executeSql(query, [email]);

    if (result.rows.length > 0) {
      const user = result.rows.item(0);
      const inputHash = this.hashPassword(password, user.salt);
      return inputHash === user.password;
    } else {
      console.log('Usuario no encontrado.');
      return false;
    }
  }

  //Verifica si la contraseña ingresada coincide con la almacenada
  async verifyPassword(email: string, password: string): Promise<boolean> {
    const database = await this.dbService.getDatabase();

    try {
      const query = `SELECT password, salt FROM Users WHERE email = ?`;
      const result = await database.executeSql(query, [email]);

      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        const storedHash = user.password;
        const salt = user.salt;

        const inputHash = CryptoJS.SHA256(password + salt).toString();
        return inputHash === storedHash;
      } else {
        console.log('Usuario no encontrado.');
        return false;
      }
    } catch (error) {
      console.error('Error al verificar la contraseña del usuario:', error);
      throw error;
    }
  }

  //Verifica si un email ya existe
  async emailExists(email: string): Promise<boolean> {
    const database = await this.dbService.getDatabase();
    const query = 'SELECT COUNT(*) AS count FROM Users WHERE email = ?';
    const result = await database.executeSql(query, [email]);
    return result.rows.item(0).count > 0;
  }

  //Verifica si un nombre de usuario ya existe
  async usernameExists(username: string): Promise<boolean> {
    const database = await this.dbService.getDatabase();
    const query = 'SELECT COUNT(*) AS count FROM Users WHERE username = ?';
    const result = await database.executeSql(query, [username]);
    return result.rows.item(0).count > 0;
  }

  //Obtener todos los usuarios
  async getAllUsers(): Promise<any[]> {
    const database = await this.dbService.getDatabase();
    const query = 'SELECT * FROM Users';
    const result = await database.executeSql(query, []);

    const users: any[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows.item(i));
    }

    return users;
  }

  //Obtener un usuario por su email
  async getUserByEmail(email: string): Promise<any> {
    const database = await this.dbService.getDatabase();
    const query = 'SELECT * FROM Users WHERE email = ?';
    const result = await database.executeSql(query, [email]);
    return result.rows.length > 0 ? result.rows.item(0) : null;
  }

  //Obtener un usuario por su id
  async getUserById(userId: string): Promise<any> {
    const database = await this.dbService.getDatabase();
    const query = 'SELECT * FROM Users WHERE id = ?';
    const result = await database.executeSql(query, [userId]);
    return result.rows.length > 0 ? result.rows.item(0) : null;
  }

  //Obtener todos los usuarios por sus ids
  async getUsersByIds(userIds: string[]): Promise<any[]> {
    const database = await this.dbService.getDatabase();
    const idsString = userIds.map(() => '?').join(',');
    const query = `SELECT * FROM Users WHERE id IN (${idsString})`;
    const result = await database.executeSql(query, userIds);

    const users: any[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows.item(i));
    }
    return users;
  }

  //Elimina un usuario mediante su nombre de usuario
  async deleteUserByUsername(username: string): Promise<void> {
    const database = await this.dbService.getDatabase();
    const query = 'DELETE FROM Users WHERE username = ?';
    await database.executeSql(query, [username]);
    console.log(`Usuario con username "${username}" eliminado correctamente.`);
  }

  //Hashea la contraseña
  private hashPassword(password: string, salt: string): string {
    return CryptoJS.SHA256(password + salt).toString();
  }

  //Formatea la fecha
  private formatDate(birthdate?: string | Date): string | null {
    if (!birthdate) return null;
    return typeof birthdate === 'string'
      ? new Date(birthdate).toISOString().split('T')[0]
      : birthdate.toISOString().split('T')[0];
  }
}
