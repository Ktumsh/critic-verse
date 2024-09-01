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
  {
    id: nanoid(),
    role: 'user',
    email: 'tony.reichert@gmail.com',
    username: 'tonyReichert01',
    password: '12345',
    birthdate: new Date('1995-06-14T08:30:00'),
    createdAt: new Date('2023-03-10T14:45:00'),
    profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'zoey.lang@gmail.com',
    username: 'zoeyLang2024',
    password: '12345',
    birthdate: new Date('1992-09-23T15:20:00'),
    createdAt: new Date('2023-05-12T09:15:00'),
    profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'jane.fisher@gmail.com',
    username: 'janeFisher87',
    password: '12345',
    birthdate: new Date('1998-02-07T07:00:00'),
    createdAt: new Date('2024-01-22T11:00:00'),
    profileImage: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'william.howard@gmail.com',
    username: 'willHow42',
    password: '12345',
    birthdate: new Date('1994-12-19T10:45:00'),
    createdAt: new Date('2023-06-30T16:30:00'),
    profileImage: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'kristen.cooper@gmail.com',
    username: 'kristenC_99',
    password: '12345',
    birthdate: new Date('1997-04-11T09:30:00'),
    createdAt: new Date('2023-07-14T10:20:00'),
    profileImage: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'brian.kim@gmail.com',
    username: 'briankim22',
    password: '12345',
    birthdate: new Date('1991-11-21T06:00:00'),
    createdAt: new Date('2022-11-18T12:35:00'),
    profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'michael.hunt@gmail.com',
    username: 'mikeHunt007',
    password: '12345',
    birthdate: new Date('1989-08-10T14:20:00'),
    createdAt: new Date('2023-02-25T08:00:00'),
    profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29027007d',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'samantha.brooks@gmail.com',
    username: 'samBrooks_93',
    password: '12345',
    birthdate: new Date('1993-03-15T11:45:00'),
    createdAt: new Date('2023-01-05T13:10:00'),
    profileImage: 'https://i.pravatar.cc/150?u=a042581f4e27027008d',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'frank.harrison@gmail.com',
    username: 'frankH_91',
    password: '12345',
    birthdate: new Date('1991-05-22T12:00:00'),
    createdAt: new Date('2023-04-18T14:50:00'),
    profileImage: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'emma.adams@gmail.com',
    username: 'emmaAdams91',
    password: '12345',
    birthdate: new Date('1991-07-30T09:25:00'),
    createdAt: new Date('2023-03-14T11:30:00'),
    profileImage: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'brandon.stevens@gmail.com',
    username: 'brandonS_88',
    password: '12345',
    birthdate: new Date('1988-10-02T16:15:00'),
    createdAt: new Date('2022-12-01T10:45:00'),
    profileImage: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'megan.richards@gmail.com',
    username: 'meganR_95',
    password: '12345',
    birthdate: new Date('1995-09-12T08:50:00'),
    createdAt: new Date('2023-05-30T09:40:00'),
    profileImage: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'oliver.scott@gmail.com',
    username: 'oliverS1990',
    password: '12345',
    birthdate: new Date('1990-06-18T13:05:00'),
    createdAt: new Date('2023-06-22T07:25:00'),
    profileImage: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'grace.allen@gmail.com',
    username: 'graceA88',
    password: '12345',
    birthdate: new Date('1988-12-05T17:35:00'),
    createdAt: new Date('2022-10-20T08:55:00'),
    profileImage: 'https://i.pravatar.cc/150?img=16',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'noah.carter@gmail.com',
    username: 'noahC_97',
    password: '12345',
    birthdate: new Date('1997-04-27T06:20:00'),
    createdAt: new Date('2023-02-11T15:15:00'),
    profileImage: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'ava.perez@gmail.com',
    username: 'avaPerez01',
    password: '12345',
    birthdate: new Date('2001-01-19T10:10:00'),
    createdAt: new Date('2022-11-29T12:40:00'),
    profileImage: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'liam.johnson@gmail.com',
    username: 'liamJ1992',
    password: '12345',
    birthdate: new Date('1992-02-16T14:00:00'),
    createdAt: new Date('2023-03-01T09:50:00'),
    profileImage: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'sophia.taylor@gmail.com',
    username: 'sophiaT2024',
    password: '12345',
    birthdate: new Date('1993-05-13T08:40:00'),
    createdAt: new Date('2023-06-09T11:05:00'),
    profileImage: 'https://i.pravatar.cc/150?img=29',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'lucas.harris@gmail.com',
    username: 'lucasH90',
    password: '12345',
    birthdate: new Date('1990-11-14T05:55:00'),
    createdAt: new Date('2023-01-20T08:25:00'),
    profileImage: 'https://i.pravatar.cc/150?img=50',
  },
  {
    id: nanoid(),
    role: 'user',
    email: 'mia.robinson@gmail.com',
    username: 'miaR_2000',
    password: '12345',
    birthdate: new Date('2000-09-29T18:45:00'),
    createdAt: new Date('2022-12-12T10:00:00'),
    profileImage: 'https://i.pravatar.cc/150?img=45',
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
