import { customAlphabet } from 'nanoid';
import { User } from '../types/user';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const USER_MODEL: User[] = [
  {
    id: nanoid(),
    role: 'admin',
    email: 'jo.barra@duocuc.cl',
    username: 'ktumsh',
    password: '12345',
    birthdate: new Date('2002-01-11T12:00:00'),
    createdAt: new Date('2024-08-28T12:00:00'),
  },
  {
    id: nanoid(),
    role: 'admin',
    email: 'ren.rivera@duocuc.cl',
    username: 'rynat',
    password: '12345',
    birthdate: new Date('2005-01-15T12:00:00'),
    createdAt: new Date('2024-08-28T12:00:00'),
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'usuario@duocuc.cl',
    username: '_username69',
    password: '12345',
    birthdate: new Date('2003-01-10T12:00:00'),
    createdAt: new Date('2024-08-28T12:00:00'),
  },
];
