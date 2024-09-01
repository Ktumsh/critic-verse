import { customAlphabet } from 'nanoid';
import { TvShow } from '../types/tv';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const TV_MODEL: TvShow[] = [
  {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    image: '/assets/tv/01.webp',
    rating: 9.5,
    detail: {
      description:
        'Un profesor de química de secundaria convertido en fabricante de metanfetaminas navega los peligros del comercio de drogas.',
      genre: ['Crimen', 'Drama', 'Suspenso'],
      cast: [
        {
          actor: 'Bryan Cranston',
          character: 'Walter White',
          image:
            'https://www.metacritic.com/a/img/resize/95c4d7c41d5dcbbf5a957072637480c4a50af37a/catalog/provider/2/9/2-f93822c86cb64a5b776b6cc41b92ade7.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Aaron Paul',
          character: 'Jesse Pinkman',
          image:
            'https://www.metacritic.com/a/img/resize/9724607a4d1f73d5158e802ce45b07f438171cac/catalog/provider/2/9/2-5c460500af1abf4357b784e091bbe73b.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Anna Gunn',
          character: 'Skyler White',
          image:
            'https://www.metacritic.com/a/img/resize/3e5aa9d3d6829e74d5c0971bac1d0de3a625c8d6/catalog/provider/2/9/2-0461cc43aa19670570e7c634d139a48a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Dean Norris',
          character: 'Hank Schrader',
          image:
            'https://www.metacritic.com/a/img/resize/61f9e17c36ede6104ec052695114a4adf484e9d7/catalog/provider/2/9/2-577996223516c62a40afa5ec27a68d4c.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Vince Gilligan'],
      producer: ['Vince Gilligan', 'Mark Johnson', 'Michelle MacLaren'],
      writer: ['Vince Gilligan', 'Peter Gould'],
      seasons: 5,
      episodesPerSeason: [
        { season: 1, episodes: 7 },
        { season: 2, episodes: 13 },
        { season: 3, episodes: 13 },
        { season: 4, episodes: 13 },
        { season: 5, episodes: 16 },
      ],
      episodeDuration: '47 minutos',
      releaseDate: new Date('2008-01-20'),
      streamingPlatform: ['Netflix', 'Amazon Prime'],
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Una conclusión sorprendente la última temporada y casi perfecta para una de las mejores historias jamás contadas en televisión. Impresionante en todos los sentidos.',
        date: new Date('2024-08-12'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'La actuación de Bryan Cranston es fenomenal. La historia te mantiene en el borde de tu asiento.',
        date: new Date('2024-08-14'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8.5,
        comment:
          'Una narrativa sólida, aunque algunos episodios se sienten lentos. Aún así, una serie que vale la pena.',
        date: new Date('2024-08-16'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 9.8,
        comment:
          'Brillante desde el comienzo hasta el final. La transformación de Walter White es una obra maestra.',
        date: new Date('2024-08-18'),
        userId: '4',
        report: {
          reason: 'Spoilers sin advertencia.',
          date: new Date('2024-08-19'),
          reportedBy: '5',
        },
      },
    ],
  },
  {
    id: 'sweet-tooth',
    title: 'Sweet Tooth',
    image: '/assets/tv/02.webp',
    rating: 3.4,
    detail: {
      description:
        'Un niño mitad humano, mitad ciervo busca un nuevo comienzo en un mundo post-apocalíptico devastado por un virus mortal.',
      genre: ['Drama', 'Fantasía', 'Aventura'],
      cast: [
        {
          actor: 'Christian Convery',
          character: 'Gus',
          image: '',
        },
        {
          actor: 'Nonso Anozie',
          character: 'Tommy Jepperd',
          image:
            'https://www.metacritic.com/a/img/resize/a73439250cf4b016d43e5bb4a34331ec9afe98bc/catalog/provider/2/9/2-20a6c25df79190f500610111d2999ef9.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Adeel Akhtar',
          character: 'Dr. Singh',
          image:
            'https://www.metacritic.com/a/img/resize/bf8b24e800210df72f58bdabedecabb509254898/catalog/provider/2/14/2-1a050572a51cc7b108d215a94aec27cf.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Stefania LaVie Owen',
          character: 'Bear',
          image:
            'https://www.metacritic.com/a/img/resize/43800af8e03421c292f1d787dfb50bba6f0d7bd1/catalog/provider/2/14/2-01ea0680e75d72e62b8024234ae01a4e.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Jim Mickle'],
      producer: ['Robert Downey Jr.', 'Susan Downey', 'Amanda Burrell'],
      writer: ['Jim Mickle', 'Beth Schwartz'],
      seasons: 2,
      episodesPerSeason: [
        { season: 1, episodes: 8 },
        { season: 2, episodes: 8 },
      ],
      episodeDuration: '45 minutos',
      releaseDate: new Date('2021-06-04'),
      streamingPlatform: ['Netflix'],
    },
    reviews: [
      {
        id: nanoid(),
        rating: 5,
        comment:
          'Sweet Tooth no ha sido necesariamente la historia más tranquila, ya que a la maravillosa primera temporada le siguió una segunda más torpe de lo esperado y muchos de esos problemas siguen presentes en la última temporada.',
        date: new Date('2024-06-06'),
        userId: '2',
        report: {
          reason: 'Comentario confuso e incoherente.',
          date: new Date('2024-06-07'),
          reportedBy: '3',
        },
      },
      {
        id: nanoid(),
        rating: 4,
        comment:
          'Una idea interesante, pero la ejecución es inconsistente. No logró mantener mi interés.',
        date: new Date('2024-06-10'),
        userId: '3',
      },
    ],
  },
  {
    id: 'game-of-thrones',
    title: 'Game of Thrones',
    image: '/assets/tv/03.webp',
    rating: 8.5,
    detail: {
      description:
        'Nueve familias nobles luchan por el control de las tierras de Westeros, mientras un enemigo antiguo regresa.',
      cast: [
        {
          actor: 'Emilia Clarke',
          character: 'Daenerys Targaryen',
          image:
            'https://www.metacritic.com/a/img/resize/26c088e28ab87a5edf262c84d83c91f91015ee6d/catalog/provider/2/9/2-abd65dc6c917111cfabef3616350e12a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Kit Harington',
          character: 'Jon Snow',
          image:
            'https://www.metacritic.com/a/img/resize/e4a0f0f540db16402b6ca4738b2bab5dbdc7d064/catalog/provider/2/9/2-254636fe50fa428c0de944e97f8cefb0.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Lena Headey',
          character: 'Cersei Lannister',
          image:
            'https://www.metacritic.com/a/img/resize/b36c91696ac5ead2bc9be85b950eb56d7d60b525/catalog/provider/2/9/2-b081cf76c45215b6614b9ee53fbed5d0.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Peter Dinklage',
          character: 'Tyrion Lannister',
          image:
            'https://www.metacritic.com/a/img/resize/3c5df7599474ac60f8c7f41b371bd3600b3b9146/catalog/provider/2/9/2-26a8d155f1769d63523daa9f4506e17f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['David Benioff', 'D.B. Weiss'],
      producer: ['David Benioff', 'D.B. Weiss', 'Carolyn Strauss'],
      writer: ['David Benioff', 'D.B. Weiss', 'George R.R. Martin'],
      seasons: 8,
      episodesPerSeason: [
        { season: 1, episodes: 10 },
        { season: 2, episodes: 10 },
        { season: 3, episodes: 10 },
        { season: 4, episodes: 10 },
        { season: 5, episodes: 10 },
        { season: 6, episodes: 10 },
        { season: 7, episodes: 7 },
        { season: 8, episodes: 6 },
      ],
      genre: ['Drama', 'Fantasía', 'Aventura'],
      episodeDuration: '60 minutos',
      releaseDate: new Date('2011-04-17'),
      streamingPlatform: ['HBO Max'],
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La dirección artística, las interpretaciones y los increíbles decorados son tan impresionantes como el alcance masivo de la serie. Al principio es un poco lenta, pero te atrapa una vez que te metes en ella.',
        date: new Date('2020-04-13'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La serie es grandiosa hasta la última temporada. Una gran decepción con el final.',
        date: new Date('2021-05-01'),
        userId: '4',
        report: {
          reason: 'Spoilers sobre el final sin advertencia.',
          date: new Date('2021-05-02'),
          reportedBy: '5',
        },
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Una de las mejores series hasta su última temporada, donde se sintió una caída en la narrativa.',
        date: new Date('2022-03-15'),
        userId: '5',
      },
    ],
  },
  {
    id: 'the-boys',
    title: 'The Boys',
    image: '/assets/tv/04.webp',
    rating: 5.1,
    detail: {
      description:
        'Un grupo de vigilantes conocido informalmente como "The Boys" se propone acabar con los superhéroes corruptos que abusan de sus poderes.',
      genre: ['Acción', 'Drama', 'Ciencia Ficción'],
      cast: [
        {
          actor: 'Karl Urban',
          character: 'Billy Butcher',
          image:
            'https://www.metacritic.com/a/img/resize/e381f34af764e1abf9e68cf9df2916a0596b4008/catalog/provider/2/9/2-aa7272388ea505e3815717f35f53cac3.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Jack Quaid',
          character: 'Hughie Campbell',
          image:
            'https://www.metacritic.com/a/img/resize/35d9cf83a707f54be86b7702305e22683f1344c9/catalog/provider/2/9/2-1630e33c2db988f0629a7b870c448caa.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Antony Starr',
          character: 'Homelander',
          image:
            'https://www.metacritic.com/a/img/resize/586c5522da58c503f9f0a5a3492295cac11ad1cd/catalog/provider/2/9/2-223b88573b530cba7ab526e52f3675a2.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Erin Moriarty',
          character: 'Starlight',
          image:
            'https://www.metacritic.com/a/img/resize/feb681a41bcdbc9d61e38991b60498e269ea09dc/catalog/provider/2/9/2-acc2ba93f3cb81080dbd9f9b5387d8fc.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Eric Kripke'],
      producer: ['Seth Rogen', 'Evan Goldberg', 'Neal H. Moritz'],
      writer: ['Eric Kripke', 'Evan Goldberg'],
      seasons: 3,
      episodesPerSeason: [
        { season: 1, episodes: 8 },
        { season: 2, episodes: 8 },
        { season: 3, episodes: 8 },
      ],
      episodeDuration: '60 minutos',
      releaseDate: new Date('2019-07-26'),
      streamingPlatform: ['Amazon Prime'],
    },
    reviews: [
      {
        id: nanoid(),
        rating: 4.5,
        comment:
          'Una verdadera lástima. La primera temporada fue increíble, nueva y fresca. La segunda temporada tuvo momentos muy buenos, muy sangrientos e impactantes, pero también se inclinó por las opiniones políticas de izquierdas como el resto de la basura de Hollywood, y eso ha dañado mucho a la serie. No es tan malo como el final de Juego de Tronos, pero es solo otra serie, nada especial.',
        date: new Date('2020-09-16'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'Tiene sus momentos brillantes, pero algunas subtramas se sienten forzadas y fuera de lugar.',
        date: new Date('2020-09-20'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Interesante enfoque sobre los superhéroes, pero a veces exagera en su tono.',
        date: new Date('2020-09-25'),
        userId: '6',
        report: {
          reason: 'Comentario ofensivo hacia los creadores.',
          date: new Date('2020-09-26'),
          reportedBy: '7',
        },
      },
    ],
  },
  {
    id: 'the-office',
    title: 'The Office',
    image: '/assets/tv/05.webp',
    rating: 9,
    detail: {
      description:
        'Una comedia sobre un grupo de trabajadores de oficina típicos, donde el día de trabajo consiste en choques de ego, comportamientos inapropiados y tedio.',
      genre: ['Comedia'],
      cast: [
        {
          actor: 'Steve Carell',
          character: 'Michael Scott',
          image:
            'https://www.metacritic.com/a/img/resize/84239affd07003910066ccea5d0893b1f23a3cdf/catalog/provider/2/9/2-a22e528cedd1ac7d0e6cde73d2c75f26.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Rainn Wilson',
          character: 'Dwight Schrute',
          image:
            'https://www.metacritic.com/a/img/resize/e8fbfd2071bdc11a633c9c4445d0d145914103aa/catalog/provider/2/9/2-90a5dc70069665f6ed7890b6b22d8fae.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'John Krasinski',
          character: 'Jim Halpert',
          image:
            'https://www.metacritic.com/a/img/resize/66bcca394bef6077485bb572b7428452d7df5552/catalog/provider/2/14/2-e874b4d2652462f08467e56f5528de4a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Jenna Fischer',
          character: 'Pam Beesly',
          image:
            'https://www.metacritic.com/a/img/resize/fc1e7dbe09dcf193a2330fa4ab849e0f8a478cd2/catalog/provider/2/9/2-c5c597cc8e87d8afa232c7f8a76297ac.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Greg Daniels'],
      producer: ['Greg Daniels', 'Paul Lieberstein', 'Ricky Gervais'],
      writer: ['Greg Daniels', 'Ricky Gervais', 'Stephen Merchant'],
      seasons: 9,
      episodesPerSeason: [
        { season: 1, episodes: 6 },
        { season: 2, episodes: 22 },
        { season: 3, episodes: 23 },
        { season: 4, episodes: 14 },
        { season: 5, episodes: 26 },
        { season: 6, episodes: 26 },
        { season: 7, episodes: 24 },
        { season: 8, episodes: 24 },
        { season: 9, episodes: 25 },
      ],
      episodeDuration: '22 minutos',
      releaseDate: new Date('2005-03-24'),
      streamingPlatform: ['Netflix', 'Peacock'],
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Todo lo que hizo que la primera temporada fuera tan buena (el guión, la actuación, la incomodidad de todo) no ha disminuido en la segunda temporada. Genial.',
        date: new Date('2021-01-06'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 9.5,
        comment:
          'Un clásico moderno. Cada episodio tiene algo que te hace reír o reflexionar.',
        date: new Date('2021-02-10'),
        userId: '6',
        report: {
          reason: 'Comentario considerado como spoiler.',
          date: new Date('2021-02-11'),
          reportedBy: '7',
        },
      },
      {
        id: nanoid(),
        rating: 8.5,
        comment:
          'Algunas temporadas son mejores que otras, pero el conjunto general es fantástico.',
        date: new Date('2021-03-05'),
        userId: '7',
      },
    ],
  },
];
