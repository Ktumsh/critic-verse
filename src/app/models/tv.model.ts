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
        { actor: 'Bryan Cranston', character: 'Walter White' },
        { actor: 'Aaron Paul', character: 'Jesse Pinkman' },
        { actor: 'Anna Gunn', character: 'Skyler White' },
        { actor: 'Dean Norris', character: 'Hank Schrader' },
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
        { actor: 'Christian Convery', character: 'Gus' },
        { actor: 'Nonso Anozie', character: 'Tommy Jepperd' },
        { actor: 'Adeel Akhtar', character: 'Dr. Singh' },
        { actor: 'Stefania LaVie Owen', character: 'Bear' },
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
        { actor: 'Emilia Clarke', character: 'Daenerys Targaryen' },
        { actor: 'Kit Harington', character: 'Jon Snow' },
        { actor: 'Lena Headey', character: 'Cersei Lannister' },
        { actor: 'Peter Dinklage', character: 'Tyrion Lannister' },
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
        { actor: 'Karl Urban', character: 'Billy Butcher' },
        { actor: 'Jack Quaid', character: 'Hughie Campbell' },
        { actor: 'Antony Starr', character: 'Homelander' },
        { actor: 'Erin Moriarty', character: 'Starlight' },
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
        { actor: 'Steve Carell', character: 'Michael Scott' },
        { actor: 'Rainn Wilson', character: 'Dwight Schrute' },
        { actor: 'John Krasinski', character: 'Jim Halpert' },
        { actor: 'Jenna Fischer', character: 'Pam Beesly' },
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
