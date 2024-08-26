import { customAlphabet } from 'nanoid';
import { TvShow } from '../types/tv';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const TV_MODEL = [
  {
    id: '1',
    title: 'Breaking Bad',
    image: '/assets/tv/01.webp',
    description:
      'Un profesor de química de secundaria convertido en fabricante de metanfetaminas navega los peligros del comercio de drogas.',
    genre: ['Crimen', 'Drama', 'Suspenso'],
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris'],
    director: ['Vince Gilligan'],
    producers: ['Vince Gilligan', 'Mark Johnson', 'Michelle MacLaren'],
    writers: ['Vince Gilligan', 'Peter Gould'],
    seasons: 5,
    episodesPerSeason: [
      { season: 1, episodes: 7 },
      { season: 2, episodes: 13 },
      { season: 3, episodes: 13 },
      { season: 4, episodes: 13 },
      { season: 5, episodes: 16 },
    ],
    rating: 9.5,
    releaseDate: '20-01-2008',
    episodeDuration: '47 minutos',
    streamingPlatforms: ['Netflix', 'Amazon Prime'],
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Una conclusión sorprendente la ultima temporada y casi perfecta para una de las mejores historias jamás contadas en televisión. Impresionante en todos los sentidos.',
        date: '12-08-2024',
        userId: '1',
      },
    ],
  },
  {
    id: '2',
    title: 'Sweet Tooth',
    image: '/assets/tv/02.webp',
    description:
      'Un niño mitad humano, mitad ciervo busca un nuevo comienzo en un mundo post-apocalíptico devastado por un virus mortal.',
    genre: ['Drama', 'Fantasía', 'Aventura'],
    cast: [
      'Christian Convery',
      'Nonso Anozie',
      'Adeel Akhtar',
      'Stefania LaVie Owen',
    ],
    director: ['Jim Mickle'],
    producers: ['Robert Downey Jr.', 'Susan Downey', 'Amanda Burrell'],
    writers: ['Jim Mickle', 'Beth Schwartz'],
    seasons: 2,
    episodesPerSeason: [
      { season: 1, episodes: 8 },
      { season: 2, episodes: 8 },
    ],
    rating: 7.8,
    releaseDate: '04-06-2021',
    episodeDuration: '45 minutos',
    streamingPlatforms: ['Netflix'],
    reviews: [
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Sweet Tooth no ha sido necesariamente la historia más tranquila, ya que a la maravillosa primera temporada le siguió una segunda más torpe de lo esperado y muchos de esos problemas siguen presentes en la última temporada.',
        date: '06-06-2024',
        userId: '2',
      },
    ],
  },
  {
    id: '3',
    title: 'Game of Thrones',
    image: '/assets/tv/03.webp',
    description:
      'Nueve familias nobles luchan por el control de las tierras de Westeros, mientras un enemigo antiguo regresa.',
    genre: ['Drama', 'Fantasía', 'Aventura'],
    cast: ['Emilia Clarke', 'Kit Harington', 'Lena Headey', 'Peter Dinklage'],
    director: ['David Benioff', 'D.B. Weiss'],
    producers: ['David Benioff', 'D.B. Weiss', 'Carolyn Strauss'],
    writers: ['David Benioff', 'D.B. Weiss', 'George R.R. Martin'],
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
    rating: 8.5,
    releaseDate: '17-04-2011',
    episodeDuration: '60 minutos',
    streamingPlatforms: ['HBO Max'],
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La dirección artística, las interpretaciones y los increíbles decorados son tan impresionantes como el alcance masivo de la serie. Al principio es un poco lenta, pero te atrapa una vez que te metes en ella.',
        date: '13-04-2020',
        userId: '3',
      },
    ],
  },
  {
    id: '4',
    title: 'The Boys',
    image: '/assets/tv/04.webp',
    description:
      'Un grupo de vigilantes conocido informalmente como "The Boys" se propone acabar con los superhéroes corruptos que abusan de sus poderes.',
    genre: ['Acción', 'Drama', 'Ciencia Ficción'],
    cast: ['Karl Urban', 'Jack Quaid', 'Antony Starr', 'Erin Moriarty'],
    director: ['Eric Kripke'],
    producers: ['Seth Rogen', 'Evan Goldberg', 'Neal H. Moritz'],
    writers: ['Eric Kripke', 'Evan Goldberg'],
    seasons: 3,
    episodesPerSeason: [
      { season: 1, episodes: 8 },
      { season: 2, episodes: 8 },
      { season: 3, episodes: 8 },
    ],
    rating: 7,
    releaseDate: '26-07-2019',
    episodeDuration: '60 minutos',
    streamingPlatforms: ['Amazon Prime'],
    reviews: [
      {
        id: nanoid(),
        rating: 4.5,
        comment:
          'Una verdadera lástima. La primera temporada fue increíble, nueva y fresca. La segunda temporada tuvo momentos muy buenos, muy sangrientos e impactantes, pero también se inclinó por las opiniones políticas de izquierdas como el resto de la basura de Hollywood, y eso ha dañado mucho a la serie. No es tan malo como el final de Juego de Tronos, pero es solo otra serie, nada especial.',
        date: '16-09-2020',
        userId: '4',
      },
    ],
  },
  {
    id: '5',
    title: 'The Office',
    image: '/assets/tv/05.webp',
    description:
      'Una comedia sobre un grupo de trabajadores de oficina típicos, donde el día de trabajo consiste en choques de ego, comportamientos inapropiados y tedio.',
    genre: ['Comedia'],
    cast: ['Steve Carell', 'Rainn Wilson', 'John Krasinski', 'Jenna Fischer'],
    director: ['Greg Daniels'],
    producers: ['Greg Daniels', 'Paul Lieberstein', 'Ricky Gervais'],
    writers: ['Greg Daniels', 'Ricky Gervais', 'Stephen Merchant'],
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
    rating: 9,
    releaseDate: '24-03-2005',
    episodeDuration: '22 minutos',
    streamingPlatforms: ['Netflix', 'Peacock'],
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Todo lo que hizo que la primera temporada fuera tan buena (el guión, la actuación, la incomodidad de todo) no ha disminuido en la segunda temporada. Genial.',
        date: '06-01-2021',
        userId: '5',
      },
    ],
  },
];
