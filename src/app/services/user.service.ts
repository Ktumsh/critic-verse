import { Injectable } from '@angular/core';
import { generateUUID } from 'src/utils/common';
import { DbService } from './db.service';
import * as CryptoJS from 'crypto-js';
import { createAvatar } from '@dicebear/core';
import * as botttsNeutral from '@dicebear/bottts-neutral';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private dbService: DbService) {}

  //Crear un nuevo usuario (para el registro)
  async createUser(user: {
    email: string;
    username: string;
    password: string;
    birthdate?: string | Date;
    role?: string;
    profileImage?: string;
  }): Promise<void> {
    const database = await this.dbService.getDatabase();
    try {
      const userId = generateUUID();
      const role = user.role ?? 'user';
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
      this.getAllUsers();
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
  }): Promise<void> {
    const database = await this.dbService.getDatabase();
    const userId = generateUUID();
    const salt = generateUUID();
    const hashedPassword = this.hashPassword(user.password, salt);
    const formattedBirthdate = this.formatDate(user.birthdate);

    const avatar = createAvatar(botttsNeutral, {
      seed: user.username,
      backgroundType: ['gradientLinear', 'solid'],
    });

    const profileImage = avatar.toDataUri();

    const emailExists = await this.emailExists(user.email);
    const usernameExists = await this.usernameExists(user.username);

    if (emailExists || usernameExists) {
      console.log(
        `El usuario con email "${user.email}" o username "${user.username}" ya existe, se omite la creación.`
      );
      return;
    }

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
      profileImage || null,
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
    this.usersSubject.next(users);
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

    const queryUserRole = 'SELECT role FROM Users WHERE username = ?';
    const resultUserRole = await database.executeSql(queryUserRole, [username]);
    if (resultUserRole.rows.length === 0) {
      throw new Error('Usuario no encontrado.');
    }

    const userRole = resultUserRole.rows.item(0).role;

    if (userRole === 'admin') {
      const queryAdminCount =
        'SELECT COUNT(*) as count FROM Users WHERE role = ?';
      const resultAdminCount = await database.executeSql(queryAdminCount, [
        'admin',
      ]);

      if (
        resultAdminCount.rows.length > 0 &&
        resultAdminCount.rows.item(0).count <= 1
      ) {
        throw new Error(
          'No se puede eliminar tu cuenta, ya que eres el único administrador.'
        );
      }
    }

    const query = 'DELETE FROM Users WHERE username = ?';
    await database.executeSql(query, [username]);
    this.getAllUsers();
    console.log(`Usuario con username "${username}" eliminado correctamente.`);
  }

  //Actualizar la contraseña de un usuario
  async updatePassword(email: string, newPassword: string): Promise<void> {
    const database = await this.dbService.getDatabase();
    try {
      const salt = generateUUID();
      const hashedPassword = this.hashPassword(newPassword, salt);

      const query = `
        UPDATE Users
        SET password = ?, salt = ?
        WHERE email = ?
      `;
      await database.executeSql(query, [hashedPassword, salt, email]);

      console.log(
        `Contraseña actualizada para el usuario con email "${email}"`
      );
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error;
    }
  }

  //Actualizar un usuario
  async updateUser(user: {
    id: string;
    username: string;
    profileImage?: string;
    role?: string;
    birthdate?: string | Date;
  }): Promise<void> {
    const database = await this.dbService.getDatabase();
    const formattedBirthdate = this.formatDate(user.birthdate);
    try {
      let query = `UPDATE Users SET username = ?, role = ?, birthdate = ?`;
      const userValues: any[] = [user.username, user.role, formattedBirthdate];

      if (user.profileImage !== undefined) {
        query += `, profileImage = ?`;
        userValues.push(user.profileImage);
      }

      query += ` WHERE id = ?`;
      userValues.push(user.id);

      await database.executeSql(query, userValues);
      this.getAllUsers();
      console.log(`Usuario con id "${user.id}" actualizado correctamente.`);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
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
