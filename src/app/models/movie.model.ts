import { customAlphabet } from 'nanoid';
import { Movie } from '../types/movie';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const MOVIE_MODEL: Movie[] = [
  {
    id: 'deadpool-&-wolverine',
    title: 'Deadpool & Wolverine',
    description:
      'Un cansado glotón se encuentra recuperándose de sus heridas cuando se encuentra con un Deadpool bocazas que ha viajado en el tiempo para curar a su mejor amigo con la esperanza de hacerse amigo de la bestia salvaje y formar equipo para derrotar a un enemigo que ambos tienen en común.',
    image: '/assets/movie/01.webp',
    rating: 9.7,
    detail: {
      cast: [
        {
          actor: 'Ryan Reynolds',
          character: 'Deadpool',
          image:
            'https://www.metacritic.com/a/img/resize/008bc9abb36f96d2d07d1f6a1fccebad09e9db90/catalog/provider/2/9/2-9916bf29a5dec935b32b93d92e40dee2.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Hugh Jackman',
          character: 'Wolverine',
          image:
            'https://www.metacritic.com/a/img/resize/5dfd48e5d55ffc9f98835c51a53bf1e264e2c70b/catalog/provider/2/9/2-fe33f7bac54383e9ed757559162f3265.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Emma Corrin',
          character: 'Cassandra Nova',
          image:
            'https://www.metacritic.com/a/img/resize/3e1e73932a366912f816016158448601f22ff7e8/catalog/provider/2/9/2-e5e54561c905148b4caee7949549e80a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Matthew Macfadyen',
          character: 'Mr. Paradox',
          image:
            'https://www.metacritic.com/a/img/resize/e3af78fb601824e235de2dcea9e76ca6833ddb35/catalog/provider/2/9/2-10a042edbe335fd89b456d96fc7b4e90.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Dafne Keen',
          character: 'Laura/X-23',
          image:
            'https://www.metacritic.com/a/img/resize/70ec3bb5af94ba6b4cfb8032fd14032d0f634226/catalog/provider/2/13/2-800dbb8c1b612c26ca851ffdd1422e21.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Shawn Levy'],
      producer: [
        'Campana Mitchell',
        'Kevin Feige',
        'Shawn Levy',
        'Josh McLaglen',
        'María McLaglen',
        'Rhett Reese',
        'Ryan Reynolds',
        'Lauren Shuler Donner',
      ],
      writer: [
        'Ryan Reynolds',
        'Rhett Reese',
        'Pablo Wernick',
        'Pozos de Zeb',
        'Shawn Levy',
      ],
      productionCompany: ['Marvel Studios'],
      genre: ['Acción', 'Aventura', 'Comedia', 'Ciencia ficción'],
      releaseDate: new Date('2024-07-26'),
      timeDuration: '2h 8m',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Me encantó esta película, la comedia es excelente y para los fanáticos de Deadpool hay muchas referencias cómicas a la altura del personaje.',
        date: new Date('2024-08-22'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          '¡Una combinación épica! Ryan Reynolds y Hugh Jackman tienen una química increíble en pantalla.',
        date: new Date('2024-08-24'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Divertida y llena de acción, aunque algunos chistes podrían no ser para todos.',
        date: new Date('2024-08-26'),
        userId: '3',
        report: {
          reason: 'Comentario ofensivo sobre el humor de la película.',
          date: new Date('2024-08-27'),
          reportedBy: '5',
        },
      },
      {
        id: nanoid(),
        rating: 9.5,
        comment:
          'Un crossover que nunca supimos que necesitábamos. Una película entretenida y emocionante.',
        date: new Date('2024-08-28'),
        userId: '4',
      },
    ],
  },
  {
    id: 'i’ll-be-your-mirror',
    title: 'I’ll Be Your Mirror',
    description:
      'Chloe (Carla Juri) viaja a Japón por trabajo, donde es recibida por un viejo amigo, Toshi (Takashi Ueno). Entre la melancolía por la pérdida de su marido y el asombro por el cambio de perspectivas, Chloe deambula por un paisaje desconocido.',
    image: '/assets/movie/02.webp',
    rating: 3.8,
    detail: {
      cast: [
        {
          actor: 'Carla Juri',
          character: 'Chloe',
          image:
            'https://www.metacritic.com/a/img/resize/d04d0a4060a799addf1b7846cb70f516744c4604/catalog/provider/2/9/2-68baad1148a4ed6f6006a2fca0f1a76c.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Takashi Ueno',
          character: 'Toshi',
          image: '',
        },
        {
          actor: 'Sachiko Ohshima',
          character: 'Grandmother',
          image: '',
        },
        {
          actor: 'Futaba Okazaki',
          character: 'Futaba',
          image: '',
        },
        {
          actor: 'Gustaf Skarsgård',
          character: 'Peter',
          image:
            'https://www.metacritic.com/a/img/resize/6469b43ce11630f1b48389b49050f2b537cca552/catalog/provider/2/9/2-5e9895a11173f4ffacc035a811855b66.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Bradley Rust Gray'],
      producer: [
        'Bradley Rust Gray',
        'So Yong Kim',
        'Jonathon Komack Martin',
        'Alex Orlovsky',
        'Elika Portnoy',
        'David Urrutia',
        'Kiyoshi Inoue',
      ],
      writer: ['Bradley Rust Gray'],
      productionCompany: ['Mutressa Movies'],
      genre: ['Drama'],
      releaseDate: new Date('2024-08-23'),
      timeDuration: '1h 51m',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 5.8,
        comment:
          'En el fondo, la actuación de Juri es una maravilla de emoción contenida y asombro ante el mundo que la rodea. Es solo que la película que la rodea le hace un flaco favor a esa actuación.',
        date: new Date('2024-08-25'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 3,
        comment:
          'La trama es un poco lenta y confusa, no es para todos los gustos.',
        date: new Date('2024-08-27'),
        userId: '3',
        report: {
          reason: 'Comentario negativo excesivo, no constructivo.',
          date: new Date('2024-08-28'),
          reportedBy: '6',
        },
      },
    ],
  },
  {
    id: 'blink-twice',
    title: 'Blink Twice',
    description:
      'Cuando el multimillonario tecnológico Slater King (Channing Tatum) conoce a la camarera Frida (Naomi Ackie) en su gala benéfica, saltan chispas. La invita a unirse a él y a sus amigos en unas vacaciones de ensueño en su isla privada. Es el paraíso.',
    image: '/assets/movie/03.webp',
    rating: 5.5,
    detail: {
      cast: [
        {
          actor: 'Naomi Ackie',
          character: 'Frida',
          image:
            'https://www.metacritic.com/a/img/resize/b7560872ec9771f27e27d3f61f0f4b6ff549b084/catalog/provider/2/14/2-4c20503be627d2b5c63f0d8afb54f595.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Channing Tatum',
          character: 'Slater King',
          image:
            'https://www.metacritic.com/a/img/resize/a2f06c140114421b4aff75b0bddb07c1eb27f741/catalog/provider/2/9/2-55ea54a52acd864f3575302151ff5d8f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Alia Shawkat',
          character: 'Jess',
          image:
            'https://www.metacritic.com/a/img/resize/b81e1a08b1847c35e687e995db87633b68b358f0/catalog/provider/2/9/2-de2b4046cc635e44ff294fc44f06ece6.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Cristiano Slater',
          character: 'Vlc',
          image:
            'https://www.metacritic.com/a/img/resize/bcc53564e43dc8e4e18fa537871dce53be7baf75/catalog/provider/2/9/2-bdfdd2d791269c1c3d7fa08479c55c86.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Simon Rex',
          character: 'Cody',
          image: '',
        },
      ],
      director: ['Zoe Kravitz'],
      producer: [
        'Bruce Cohen',
        'Aarón Himelstein',
        'Zoe Kravitz',
        'Garret Levitz',
        'Channing Tatum',
      ],
      writer: ['Zoe Kravitz', 'Y. Feigenbaum'],
      productionCompany: ['Bruce Cohen Productions'],
      genre: ['Misterio', 'Suspenso'],
      releaseDate: new Date('2024-08-23'),
      timeDuration: '1h 42m',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Un thriller muy efectivo e incisivo que establece a Zoë Kravitz como una directora talentosa y te muestra un lado de Channing Tatum que nunca has visto antes.',
        date: new Date('2024-08-25'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'La historia es intrigante, pero algunos elementos no se desarrollan bien.',
        date: new Date('2024-08-28'),
        userId: '4',
        report: {
          reason: 'Comentario ambiguo y no claro.',
          date: new Date('2024-08-29'),
          reportedBy: '7',
        },
      },
    ],
  },
  {
    id: 'x-men:-apocalipsis',
    title: 'X-Men: Apocalipsis',
    description:
      'Desde los albores de la civilización, fue adorado como un dios. Apocalipsis, el primer y más poderoso mutante del universo X-Men de Marvel, acumuló los poderes de muchos otros mutantes, volviéndose inmortal e invencible.',
    image: '/assets/movie/04.webp',
    rating: 8,
    detail: {
      cast: [
        {
          actor: 'James McAvoy',
          character: 'Professor Charles Xavier',
          image:
            'https://www.metacritic.com/a/img/resize/03a2daf9a7b216469d152cf82a78387d5288dd21/catalog/provider/2/9/2-cf40dd56b72c8b05f3f2181724d2bfec.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Michael Fassbender',
          character: 'Erik Lehnsherr / Magneto',
          image:
            'https://www.metacritic.com/a/img/resize/0feed6697cbefef1e6ea54faa99e59a9f5872237/catalog/provider/2/14/2-c077c3d1636c2cad5a27c5d1f30887ee.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Jennifer Lawrence',
          character: 'Raven Darkhölme / Mystique',
          image:
            'https://www.metacritic.com/a/img/resize/b693790aab40f86a1bb99acdda0e17f3a87174c4/catalog/provider/2/9/2-37b38c1f1b7359f2ac6d145ac3cb6245.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Nicolás Hoult',
          character: 'Hank McCoy / Beast',
          image:
            'https://www.metacritic.com/a/img/resize/c1f2ff384b8f658927ef1095468978013c099efc/catalog/provider/2/9/2-98596c00f4dfc5bcb56b68bf24dd17d9.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Óscar Isaac',
          character: 'Apocalypse',
          image: '',
        },
      ],
      director: ['Bryan Cantante'],
      producer: [
        'Aidoo Rubio',
        'Simón Kinberg',
        'Juan Ottman',
        'Hutch Parker',
        'Lauren Shuler Donner',
        'Bryan Cantante',
        'Jason Taylor',
      ],
      writer: [
        'Simón Kinberg',
        'Bryan Cantante',
        'Michael Dougherty',
        'Dan Harris',
        'Jack Kirby',
        'Stan Lee',
      ],
      productionCompany: ['Twentieth Century Fox', 'Marvel Entertainment'],
      genre: ['Acción', 'Ciencia ficción', 'Aventura'],
      releaseDate: new Date('2016-05-27'),
      timeDuration: '2h 24m',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Al ver Apocalipsis, no tienes la sensación de que cada personaje esté preparado para su propia secuela. Se complementan entre sí. Se necesitan mutuamente. La naturaleza desbordante del elenco de la película es lo que realmente importa.',
        date: new Date('2016-05-26'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 7.5,
        comment: 'Un buen equilibrio entre acción y desarrollo de personajes.',
        date: new Date('2016-06-01'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Algunas partes del guion son predecibles, pero los efectos especiales son impresionantes.',
        date: new Date('2016-06-05'),
        userId: '6',
      },
    ],
  },
  {
    id: 'logan',
    title: 'Logan',
    description:
      'En un futuro cercano, un cansado Logan cuida al enfermo Profesor X en un escondite en la frontera mexicana. Pero los intentos de Logan de esconderse del mundo y de su legado se ven frustrados cuando llega un joven mutante perseguido por fuerzas oscuras.',
    image: '/assets/movie/05.webp',
    rating: 7.7,
    detail: {
      cast: [
        {
          actor: 'Hugh Jackman',
          character: 'Logan / Wolverine',
          image:
            'https://www.metacritic.com/a/img/resize/5dfd48e5d55ffc9f98835c51a53bf1e264e2c70b/catalog/provider/2/9/2-fe33f7bac54383e9ed757559162f3265.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Patrick Stewart',
          character: 'Charles Xavier',
          image:
            'https://www.metacritic.com/a/img/resize/798ca393d2347c99d24c77198328c6dd140d43eb/catalog/provider/2/9/2-4ad4b8dfcb2bc33bb4f1d16d193e7610.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Dafne Keen',
          character: 'Laura / X-23',
          image:
            'https://www.metacritic.com/a/img/resize/70ec3bb5af94ba6b4cfb8032fd14032d0f634226/catalog/provider/2/13/2-800dbb8c1b612c26ca851ffdd1422e21.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Boyd Holbrook',
          character: 'Pierce',
          image:
            'https://www.metacritic.com/a/img/resize/0e6107491927b82fb94c5b1de2509e8c5005c139/catalog/provider/2/9/2-350732f4bb015b0266917e383c2a0785.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Esteban Comerciante',
          character: 'Caliban',
          image: '',
        },
        {
          actor: 'Elizabeth Rodríguez',
          character: 'Gabriela',
          image: '',
        },
        {
          actor: 'Richard E. Grant',
          character: 'Dr. Rice',
          image: '',
        },
      ],
      director: ['James Mangold'],
      producer: [
        'Simón Kinberg',
        'Hutch Parker',
        'Lauren Shuler Donner',
        'Dana Robin',
        'Kurt Williams',
      ],
      writer: ['James Mangold', 'Scott Frank', 'Michael Verde'],
      productionCompany: ['Twentieth Century Fox', 'Marvel Entertainment'],
      genre: ['Acción', 'Ciencia ficción', 'Drama', 'Suspenso'],
      releaseDate: new Date('2017-03-03'),
      timeDuration: '2h 17m',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Este es un final excelente y apropiado para el mutante más grande de las películas.',
        date: new Date('2019-02-17'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Una película oscura y emocionalmente intensa que muestra una faceta diferente de Wolverine.',
        date: new Date('2019-03-01'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 7.8,
        comment:
          'Un buen cierre para el personaje de Logan, aunque algunas partes podrían haber sido mejor elaboradas.',
        date: new Date('2019-04-10'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 8.5,
        comment:
          'Profunda y conmovedora, con grandes actuaciones de Hugh Jackman y Patrick Stewart.',
        date: new Date('2019-05-05'),
        userId: '8',
      },
    ],
  },
];
