import { customAlphabet } from 'nanoid';
import { Game } from '../types/game';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const GAME_MODEL: Game[] = [
  {
    id: nanoid(),
    title: 'Black Myth: Wukong',
    image: '/assets/game/01.png',
    description:
      'Black Myth: Wukong es un juego de rol de acción basado en la mitología china. La historia está basada en Viaje al Oeste, una de las cuatro grandes novelas clásicas de la literatura china. Te embarcarás en el papel del Destinado para aventurarte en los desafíos y maravillas que te esperan, para descubrir la verdad oculta tras el velo de una gloriosa leyenda del pasado',
    rating: 9.5,
    details: {
      summary: 'Black Myth: Wukong',
      genre: ['Acción', 'Aventura'],
      plataforms: ['PS5', 'Xbox One', 'PC'],
      releaseDate: new Date('2024-08-19'),
      editor: 'Game Science',
      developer: 'Game Science',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment: 'Muy buen juego, me gustó mucho. Le doy 10 de 10',
        date: new Date('2024-08-23'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 1,
        comment: 'Muy buen juego, me gustó mucho. Le doy 10 de 10',
        date: new Date('2024-08-23'),
        userId: '1',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Elden Ring',
    image: '/assets/game/02.png',
    description:
      'Las Tierras Intermedias, empañadas por la guerra, sólo pueden sentir la gracia de la Gran Voluntad una vez más cuando un nuevo Señor de los Elden blande el Anillo de los Elden. Levántate, Tarnished, y sigue el camino más allá del mar de niebla para encontrar tu destino en la nueva experiencia similar a Dark Souls de FromSoftware Inc. Escrito por Hidetaka Miyazaki, el creador de Dark Souls, y George R.R. Martin, la mente maestra detrás de Canción de Hielo y Fuego, el juego promete un viaje cautivador pero brutal, en el que la valentía, la determinación y la insaciable sed de triunfo son la clave para acabar recogiendo todos los fragmentos del Elden Ring.',
    rating: 8,
    details: {
      summary: 'Elden Ring',
      genre: ['Acción', 'RPG'],
      plataforms: ['PS4', 'Xbox One', 'PC', 'PS5'],
      releaseDate: new Date('2022-02-25'),
      editor: 'Bandai Namco Games',
      developer: 'From Software',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Los años de espera valieron la pena, Elden Ring es genial. Ofrece una gran cantidad de contenido, un mundo hermoso y una jugabilidad adictiva. Pero la serie comienza a sentirse un poco obsoleta.',
        date: new Date('2023-03-10'),
        userId: '2',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'The Legend of Zelda: Tears of the Kingdom',
    image: '/assets/game/03.png',
    description:
      'Te espera una aventura épica por las tierras y los cielos de Hyrule en The Legend of Zelda™: Tears of the Kingdom para Nintendo Switch™. La aventura es tuya para crearla en un mundo alimentado por tu imaginación. En esta secuela de The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las misteriosas islas que flotan en los vastos cielos.',
    rating: 2.5,
    details: {
      summary: 'The Legend of Zelda: Tears of the Kingdom',
      genre: ['Acción', 'RPG'],
      plataforms: ['Nintendo Switch'],
      releaseDate: new Date('2023-05-12'),
      editor: 'Nintendo',
      developer: 'Nintendo',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 2,
        comment:
          'En general, es entretenido, pero eso es todo, es simplemente entretenido. Hay mucho que hacer, pero las cosas que realmente estás haciendo se sienten un poco superficiales. Noto que mi cerebro se desconecta mientras juego, de la misma manera que lo hace cuando veo cosas como TikTok.',
        date: new Date('2024-01-15'),
        userId: '3',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Red Dead Redemption 2',
    image: '/assets/game/04.png',
    description:
      'Desarrollado por los creadores de Grand Theft Auto V y Red Dead Redemption, Red Dead Redemption 2 es una historia épica sobre la vida en el implacable corazón de Estados Unidos. El vasto y atmosférico mundo del juego también proporciona la base para una nueva experiencia multijugador en línea. Estados Unidos, 1899. Ha comenzado el fin de la era del Salvaje Oeste.',
    rating: 9,
    details: {
      summary: 'Red Dead Redemption 2',
      genre: ['Acción', 'RPG'],
      plataforms: ['Xbox One', 'PC', 'PS5', 'PS4'],
      releaseDate: new Date('2018-10-28'),
      editor: 'Rockstar Games',
      developer: 'Rockstar Games',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Nunca hubo dudas de que Red Dead Redemption 2 iba a ser bueno, pero este es algo especial. Una obra maestra de la que muchos hablarán durante décadas.',
        date: new Date('2020-01-11'),
        userId: '4',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Sons of the Forest',
    image: '/assets/game/05.png',
    description:
      'Una experiencia completamente nueva de los creadores de "The Forest". Te envían a buscar a un multimillonario desaparecido en una isla remota y te encuentras en un infierno infestado de caníbales. Crea, construye y lucha por sobrevivir, solo o con amigos, en este nuevo y aterrador simulador de terror de supervivencia en mundo abierto. Experimenta la libertad total para enfrentarte al mundo como quieras.',
    rating: 5.8,
    details: {
      summary: 'Sons of the Forest',
      genre: ['Acción', 'Survival'],
      plataforms: ['PC'],
      releaseDate: new Date('2024-02-22'),
      editor: 'Newnight',
      developer: 'Endnight Studios',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Sons of the Forest puede tener algunos problemas con su narrativa, pero sus fundamentos de supervivencia y su sandbox aún merecen una mirada.',
        date: new Date('2024-05-28'),
        userId: '5',
      },
    ],
  },
];
