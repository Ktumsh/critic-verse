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
];

const USER_NAME: string[] = [
  'Pepito777',
  'JorgitoParrilla',
  'Juanita123',
  'Carlos89',
  'MariaLuz',
  'AnaGamer',
];
const USER_AVATAR: string[] = [
  'https://i.pinimg.com/474x/03/7f/4d/037f4dfa61c3e61d20cb0284f64fb2c7.jpg',
  'https://i.pinimg.com/474x/a2/1b/2f/a21b2fe8289e98d82d3ef6dc2e6441bc.jpg',
  'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c3/c3a3ffbb42c1030e35ffbb897d131108cd6acbcb.jpg',
  'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/cb/cb1be757cb50644b015e6845cbb732a340247a73.jpg',
  'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/84/847e74b19600b9215518b061d5b4a4e6094981dc.jpg',
  'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/0099d7bb8e19c540dcbaf831d53bcb6174e9e1d4.jpg',
];

let availableNames = [...USER_NAME];
let availableAvatars = [...USER_AVATAR];

export function randomName(): string {
  if (availableNames.length === 0) {
    availableNames = [...USER_NAME];
  }

  const index = Math.floor(Math.random() * availableNames.length);
  const name = availableNames.splice(index, 1)[0];
  return name;
}

export function randomAvatar(): string {
  if (availableAvatars.length === 0) {
    availableAvatars = [...USER_AVATAR];
  }

  const index = Math.floor(Math.random() * availableAvatars.length);
  const avatar = availableAvatars.splice(index, 1)[0];
  return avatar;
}
